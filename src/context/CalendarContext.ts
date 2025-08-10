import { DayData } from "@/types/calendar.types";
import { createContext } from "react";

type CalendarContextType = {
    calculateRangePL: (startDateTime: number, endDateTime: number) => number;
    data: Record<string, DayData>;
    exportData: () => Record<string, DayData>;
    getAllDataInRange: (
        startDateTime: number,
        endDateTime: number
    ) => DayData[];
    getDayData: (dateKey: string) => DayData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importData: (importedData: any) => boolean;
    updateDayData: (dateKey: string, dayData: DayData) => void;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

export default CalendarContext;
