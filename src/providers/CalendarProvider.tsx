import CalendarContext from "@/context/CalendarContext";
import { DayData } from "@/types/calendar.types";
import { useState, useEffect } from "react";

interface CalendarProviderProps {
    children: React.ReactNode;
}

export default function CalendarProvider({ children }: CalendarProviderProps) {
    const [data, setData] = useState<Record<string, DayData>>({});

    useEffect(() => {
        setData({});
    }, []);

    const calculateRangePL = (
        startDateTime: number,
        endDateTime: number
    ): number => {
        let total = 0;

        Object.values(data).forEach((entry) => {
            if (
                entry.dateTime >= startDateTime &&
                entry.dateTime <= endDateTime
            ) {
                total += entry.pl || 0;
            }
        });

        return total;
    };

    // Note: Only exports entries that have non-zero P&L or notes
    const exportData = (): Record<string, DayData> => {
        const exportableData: Record<string, DayData> = {};

        Object.entries(data).forEach(([dateKey, entry]) => {
            if (
                entry &&
                (entry.pl !== 0 || (entry.notes && entry.notes.trim() !== ""))
            ) {
                exportableData[dateKey] = {
                    dateTime: entry.dateTime,
                    pl: entry.pl || 0,
                    notes: entry.notes || "",
                };
            }
        });

        return exportableData;
    };

    const getAllDataInRange = (
        startDateTime: number,
        endDateTime: number
    ): DayData[] => {
        const dataInRange: DayData[] = [];

        Object.values(data).forEach((entry) => {
            if (
                entry.dateTime >= startDateTime &&
                entry.dateTime <= endDateTime &&
                entry.pl !== 0
            ) {
                dataInRange.push(entry);
            }
        });

        return dataInRange.sort((a, b) => a.dateTime - b.dateTime);
    };

    const getDayData = (dateKey: string): DayData => {
        return data[dateKey] || { pl: 0, notes: "" };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isDayDataValid(obj: any): obj is DayData {
        return (
            typeof obj === "object" &&
            obj !== null &&
            typeof obj.pl === "number" &&
            typeof obj.notes === "string"
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const importData = (importedData: any): boolean => {
        if (typeof importedData !== "object" || importedData === null) {
            console.error("Invalid data format for import");
            return false;
        }

        const cleanedData: Record<string, DayData> = {};

        Object.keys(importedData).forEach((dateKey) => {
            const entry: unknown = importedData[dateKey];
            if (entry && isDayDataValid(entry)) {
                cleanedData[dateKey] = {
                    dateTime:
                        typeof entry.dateTime === "number"
                            ? entry.dateTime
                            : new Date(dateKey).getTime(),
                    pl: typeof entry.pl === "number" ? entry.pl : 0,
                    notes: typeof entry.notes === "string" ? entry.notes : "",
                };
            }
        });

        setData(cleanedData);

        return true;
    };

    const updateDayData = (dateKey: string, dayData: DayData): void => {
        setData((prev) => ({
            ...prev,
            [dateKey]: dayData,
        }));
    };

    return (
        <CalendarContext.Provider
            value={{
                data,
                calculateRangePL,
                exportData,
                getAllDataInRange,
                getDayData,
                importData,
                updateDayData,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
}
