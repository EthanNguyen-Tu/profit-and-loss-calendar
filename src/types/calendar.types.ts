type CalendarDay = {
    date: Date;
    dayNumber: number;
    fullDate: string;
    isCurrentMonth: boolean;
};

type DayData = {
    date: Date;
    pl: number;
    notes: string;
};

export type { CalendarDay, DayData };
