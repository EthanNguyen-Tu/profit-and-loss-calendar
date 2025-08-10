type CalendarDay = {
    calendarDay: string;
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
};

type DayData = {
    dateTime: number;
    pl: number;
    notes: string;
};

export type { CalendarDay, DayData };
