import { useState } from "react";
import CalendarGrid from "@/components/CalendarGrid/CalendarGrid";
import CalendarHeader from "@/components/CalendarHeader/CalendarHeader";
import DayInfoModal from "@/components/DayInfoModal/DayInfoModal";
import { CalendarDay } from "@/types/calendar.types";
import styles from "./Calendar.module.css";

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [isDIModalOpen, setIsDIModalOpen] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

    const handlePrevious = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    };

    const handleNext = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
    };

    const handleCloseModal = () => {
        setIsDIModalOpen(false);
        setSelectedDay(null);
    };

    const handleDayClick = (day: CalendarDay) => {
        setIsDIModalOpen(true);
        setSelectedDay(day);
    };

    return (
        <div className={styles.container}>
            <CalendarHeader
                currentDate={currentDate}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onDateChange={setCurrentDate}
            />
            <CalendarGrid
                currentDate={currentDate}
                onDayClick={handleDayClick}
            />
            <DayInfoModal
                day={selectedDay}
                isOpen={isDIModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};
