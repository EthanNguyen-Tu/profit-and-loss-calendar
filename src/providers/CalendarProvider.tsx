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

    const calculateRangePL = (startDate: string, endDate: string): number => {
        let total = 0;
        const start = new Date(startDate);
        const end = new Date(endDate);

        Object.keys(data).forEach((dateKey) => {
            const date = new Date(dateKey);
            if (date >= start && date <= end) {
                total += data[dateKey].pl || 0;
            }
        });

        return total;
    };

    // Note: Only exports entries that have non-zero P&L or notes
    const exportData = (): Record<string, DayData> => {
        const exportableData: Record<string, DayData> = {};

        Object.keys(data).forEach((dateKey) => {
            const entry = data[dateKey];
            if (
                entry &&
                (entry.pl !== 0 || (entry.notes && entry.notes.trim() !== ""))
            ) {
                exportableData[dateKey] = {
                    date: new Date(dateKey),
                    pl: entry.pl || 0,
                    notes: entry.notes || "",
                };
            }
        });

        return exportableData;
    };

    const getAllDataInRange = (
        startDate: string,
        endDate: string
    ): DayData[] => {
        const dataInRange: DayData[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        Object.keys(data).forEach((dateKey) => {
            const date = new Date(dateKey);
            if (date >= start && date <= end && data[dateKey].pl !== 0) {
                dataInRange.push({
                    date: new Date(dateKey),
                    pl: data[dateKey].pl,
                    notes: data[dateKey].notes,
                });
            }
        });

        return dataInRange.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
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
                    date: new Date(dateKey),
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
                calculateRangePL,
                data,
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
