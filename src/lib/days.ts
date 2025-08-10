import { CalendarDay } from "@/types/calendar.types";
import { formatDate } from "@/lib/dates";

export const weekDays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const weekDaysAbbreviated: string[] = [
    "Sun.",
    "Mon.",
    "Tue.",
    "Wed.",
    "Thu.",
    "Fri.",
    "Sat.",
];

export const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    // STEP: Handle any days that are from the previous month but included in the first week of this month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const date = new Date(prevYear, prevMonth, day);
        days.push({
            date: date,
            dayNumber: day,
            calendarDay: formatDate(date),
            isCurrentMonth: false,
        });
    }

    // STEP: Handle all days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        days.push({
            date: date,
            dayNumber: day,
            calendarDay: formatDate(date),
            isCurrentMonth: true,
        });
    }

    // STEP: Handle any days that are from the next month but included in the last week of this month
    const totalCells = Math.ceil(days.length / 7) * 7;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    let nextMonthDay = 1;
    for (let i = days.length; i < totalCells; i++) {
        const date = new Date(nextYear, nextMonth, nextMonthDay);
        days.push({
            date: date,
            dayNumber: nextMonthDay,
            calendarDay: formatDate(date),
            isCurrentMonth: false,
        });
        nextMonthDay++;
    }

    return days;
};
