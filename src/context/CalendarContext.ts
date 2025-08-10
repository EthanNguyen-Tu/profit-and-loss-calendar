import { DayData } from "@/types/calendar.types";
import { createContext } from "react";

type CalendarContextType = {
    calculateRangePL: (startDate: string, endDate: string) => number;
    data: Record<string, DayData>;
    exportData: () => Record<string, DayData>;
    getAllDataInRange: (startDate: string, endDate: string) => DayData[];
    getDayData: (dateKey: string) => DayData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importData: (importedData: any) => boolean;
    updateDayData: (dateKey: string, dayData: DayData) => void;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

export default CalendarContext;
