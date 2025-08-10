import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { months } from "@/lib/months";
import IconButton from "@/components/IconButton/IconButton";

interface MonthYearSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentDate: Date;
    onDateChange: (date: Date) => void;
}

export default function MonthYearSelectorModal({
    isOpen,
    onClose,
    currentDate,
    onDateChange,
}: MonthYearSelectorProps) {
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 110 }, (_, i) => currentYear + 10 - i);

    useEffect(() => {
        if (isOpen) {
            setSelectedMonth(currentDate.getMonth());
            setSelectedYear(currentDate.getFullYear());
        }
    }, [isOpen, currentDate]);

    const handleApply = () => {
        onDateChange(new Date(selectedYear, selectedMonth, 1));
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            title="Select Month and Year"
            ctas={
                <>
                    <IconButton
                        onClick={onClose}
                        title={"Cancel"}
                        ariaLabel={"Cancel"}
                        icon={"Cancel"}
                    />
                    <IconButton
                        onClick={handleApply}
                        title={"Apply"}
                        ariaLabel={"Apply"}
                        icon={"Apply"}
                    />
                </>
            }
        >
            <div className="flex-column">
                <div className="inputEntry">
                    <label>Month</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) =>
                            setSelectedMonth(parseInt(e.target.value))
                        }
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="inputEntry">
                    <label>Year</label>
                    <select
                        value={selectedYear}
                        onChange={(e) =>
                            setSelectedYear(parseInt(e.target.value))
                        }
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </Modal>
    );
}
