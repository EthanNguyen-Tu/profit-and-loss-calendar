import { formatUSD, getCurrencyColorClass } from "@/lib/currency";
import { useState } from "react";
import { FileText } from "lucide-react";
import useCalendar from "@/hooks/useCalendar";
import styles from "./DaySquare.module.css";
import { CalendarDay } from "@/types/calendar.types";

interface DaySquareProps {
    day: CalendarDay;
    onClick: (day: CalendarDay) => void;
}

const currMonthBackgroundColors: Record<string, string> = {
    profit: "profit-50",
    loss: "loss-50",
    neutral: "neutral-50",
};

const nonCurrMonthBackgroundColors: Record<string, string> = {
    profit: "profit-25",
    loss: "loss-25",
    neutral: "neutral-25",
};

export default function DaySquare({ day, onClick }: DaySquareProps) {
    const { getDayData } = useCalendar();
    const [showNoteTooltip, setShowNoteTooltip] = useState(false);

    const dayData = getDayData(day.fullDate);
    const pl = dayData.pl || 0;
    const dayColor = getCurrencyColorClass(pl);
    const hasNote = dayData.notes && dayData.notes.trim() !== "";

    const backgroundColor = day.isCurrentMonth
        ? currMonthBackgroundColors[dayColor]
        : nonCurrMonthBackgroundColors[dayColor];

    const textColor = day.isCurrentMonth
        ? styles.dateCurrentMonth
        : styles.dateNotCurrentMonth;

    return (
        <div
            className={`${styles.container} ${backgroundColor}`}
            onClick={() => onClick(day)}
        >
            <div className={styles.header}>
                <div className={textColor}>{day.dayNumber}</div>
                {hasNote && (
                    <div
                        onMouseEnter={() => setShowNoteTooltip(true)}
                        onMouseLeave={() => setShowNoteTooltip(false)}
                    >
                        <FileText size={12} className={textColor} />
                        {showNoteTooltip && (
                            <div className={styles.noteTooltip}>
                                {dayData.notes}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {pl !== 0 ? formatUSD(pl) : ""}
        </div>
    );
}
