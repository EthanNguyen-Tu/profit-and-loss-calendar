type CalendarDay = {
    date: Date;
    dayNumber: number;
    fullDate: string;
    isCurrentMonth: boolean;
};

type DayData = {
    dateTime: number;
    pl: number;
    notes: string;
};

export type { CalendarDay, DayData };
