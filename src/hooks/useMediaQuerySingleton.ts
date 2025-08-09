import { useEffect, useState } from "react";

const mediaQueryMap = new Map<
    string,
    { matches: boolean; subscribers: Set<(match: boolean) => void> }
>();

export const useMediaQuerySingleton = (
    query: string = "(max-width: 800px)"
) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let key = mediaQueryMap.get(query);

        if (!key) {
            const mediaQuery = window.matchMedia(query);
            const subscribers = new Set<(match: boolean) => void>();
            const notify = (e: MediaQueryListEvent) => {
                key!.matches = e.matches;
                subscribers.forEach((fn) => fn(e.matches));
            };
            mediaQuery.addEventListener("change", notify);
            key = { matches: mediaQuery.matches, subscribers };
            mediaQueryMap.set(query, key);
        }

        const callback = (match: boolean) => setMatches(match);
        key.subscribers.add(callback);
        setMatches(key.matches);

        return () => {
            key?.subscribers.delete(callback);
            if (key?.subscribers.size === 0) {
                const mediaQuery = window.matchMedia(query);
                mediaQuery.removeEventListener("change", () => {});
                mediaQueryMap.delete(query);
            }
        };
    }, [query]);

    return matches;
};
