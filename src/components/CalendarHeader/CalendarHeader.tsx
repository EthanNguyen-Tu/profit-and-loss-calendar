import useCalendar from "@/hooks/useCalendar";
import { formatUSD, getCurrencyColorClass } from "@/lib/currency";
import { getMonthName } from "@/lib/months";
import { ChevronLeft, Calculator, ChevronRight } from "lucide-react";
import { useState } from "react";
import DateRangeCalculateModal from "@/components/DateRangeCalculateModal/DateRangeCalculateModal";
import MonthYearSelectorModal from "@/components/MonthYearSelectorModal/MonthYearSelectorModal";
import styles from "./CalendarHeader.module.css";
import IconButton from "@/components/IconButton/IconButton";
import ExportDataButton from "@/components/ExportDataButton/ExportDataButton";
import ImportDataButton from "@/components/ImportDataButton/ImportDataButton";

interface CalendarHeaderProps {
    currentDate: Date;
    onPrevious: () => void;
    onNext: () => void;
    onDateChange: (date: Date) => void;
}

export default function CalendarHeader({
    currentDate,
    onPrevious,
    onNext,
    onDateChange,
}: CalendarHeaderProps) {
    const { calculateRangePL } = useCalendar();
    const [isDRCModalOpen, setIsDRCModalOpen] = useState<boolean>(false); // Date Range Calculate Modal
    const [isMYSModalOpen, setIsMYSModalOpen] = useState<boolean>(false); // Month Year Selector Modal

    const month = getMonthName(currentDate.getMonth());
    const year = currentDate.getFullYear();

    const getMonthlyTotal = () => {
        const startDate = new Date(year, currentDate.getMonth(), 1).getTime();
        const endDate = new Date(year, currentDate.getMonth() + 1, 0).getTime();
        return calculateRangePL(startDate, endDate);
    };

    const monthlyTotal = getMonthlyTotal();

    return (
        <div className={styles.container}>
            <IconButton
                icon={<ChevronLeft size={20} />}
                onClick={onPrevious}
                ariaLabel="Previous month button"
                title="Click to go to previous month"
            />
            <div className={styles.content}>
                <h2
                    className={styles.dateText}
                    onClick={() => setIsMYSModalOpen(true)}
                    title="Click to select calendar month and year"
                >
                    {month} {year}
                </h2>
                <div
                    className={`${styles.profitText} ${getCurrencyColorClass(
                        monthlyTotal
                    )}`}
                    title="Monthly Total Profit/Loss"
                >
                    {monthlyTotal !== 0 ? formatUSD(monthlyTotal) : "$0.00"}
                </div>
                <div className={styles.actionGroup}>
                    <IconButton
                        icon={<Calculator size={16} />}
                        onClick={() => setIsDRCModalOpen(true)}
                        title="Calculate P&L Range"
                        ariaLabel="Calculate P&L Range"
                    >
                        P&L Range
                    </IconButton>
                    <ImportDataButton />
                    <ExportDataButton />
                </div>
            </div>
            <IconButton
                icon={<ChevronRight size={20} />}
                onClick={onNext}
                title="Go To Next Month"
                ariaLabel="Next month button"
            />

            <DateRangeCalculateModal
                isOpen={isDRCModalOpen}
                onClose={() => setIsDRCModalOpen(false)}
            />
            <MonthYearSelectorModal
                isOpen={isMYSModalOpen}
                onClose={() => setIsMYSModalOpen(false)}
                currentDate={currentDate}
                onDateChange={onDateChange}
            />
        </div>
    );
}
