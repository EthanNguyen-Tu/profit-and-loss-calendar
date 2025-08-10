import { getDaysInMonth, weekDays, weekDaysAbbreviated } from "@/lib/days";
import DaySquare from "@/components/DaySquare/DaySquare";
import { CalendarDay } from "@/types/calendar.types";
import styles from "./CalendarGrid.module.css";
import { useMediaQuerySingleton } from "@/hooks/useMediaQuerySingleton";

interface CalendarGridProps {
    currentDate: Date;
    onDayClick: (date: CalendarDay) => void;
}

export default function CalendarGrid({
    currentDate,
    onDayClick,
}: CalendarGridProps) {
    const days = getDaysInMonth(
        currentDate.getFullYear(),
        currentDate.getMonth()
    );

    return (
        <>
            <div className={styles.header}>
                {(useMediaQuerySingleton() &&
                    weekDaysAbbreviated.map((day) => (
                        <div key={day}>{day}</div>
                    ))) ||
                    weekDays.map((day) => <div key={day}>{day}</div>)}
            </div>
            <div className={styles.content}>
                {days.map((day, index) => (
                    <DaySquare key={index} day={day} onClick={onDayClick} />
                ))}
            </div>
        </>
    );
}
