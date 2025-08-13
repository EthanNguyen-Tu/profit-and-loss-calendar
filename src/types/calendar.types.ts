type CalendarDay = {
    calendarDay: string;
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
};

type ChartData = {
    cumulativePL: number;
    displayDate: string;
    pl: number;
};

type DayData = {
    dateTime: number;
    pl: number;
    notes: string;
};

export type { CalendarDay, ChartData, DayData };
