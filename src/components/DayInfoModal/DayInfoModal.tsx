import useCalendar from "@/hooks/useCalendar";
import { CalendarDay } from "@/types/calendar.types";
import { DollarSign, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import IconButton from "@/components/IconButton/IconButton";

interface DayInfoModalProps {
    day: CalendarDay | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function DayInfoModal({
    day,
    isOpen,
    onClose,
}: DayInfoModalProps) {
    const { getDayData, updateDayData } = useCalendar();
    const [pl, setPl] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    useEffect(() => {
        if (day && isOpen) {
            const dayData = getDayData(day.calendarDay);
            setPl(dayData.pl.toString() || "");
            setNotes(dayData.notes || "");
        }
    }, [day, isOpen, getDayData]);

    const handleSave = () => {
        if (day) {
            const plValue = parseFloat(pl) || 0;
            updateDayData(day.calendarDay, {
                dateTime:
                    day.date.getTime() || new Date(day.calendarDay).getTime(),
                pl: plValue,
                notes: notes.trim(),
            });
        }
        onClose();
    };

    if (!isOpen || !day) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Edit ${
                day.date
                    ? day.date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                      })
                    : "Loading..."
            }`}
            ctas={
                <>
                    <IconButton
                        onClick={onClose}
                        title={"Cancel"}
                        ariaLabel={"Cancel"}
                    >
                        Cancel
                    </IconButton>
                    <IconButton
                        onClick={handleSave}
                        title={"Save"}
                        ariaLabel={"Save"}
                    >
                        Save
                    </IconButton>
                </>
            }
        >
            <div className="flex-column">
                <div className="inputEntry">
                    <label>
                        <DollarSign size={16} />
                        Profit/Loss (USD)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={pl}
                        onChange={(e) => setPl(e.target.value)}
                    />
                </div>
                <div className="inputEntry">
                    <label>
                        <FileText size={16} />
                        Notes
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add your notes here..."
                        rows={5}
                        cols={32}
                    />
                </div>
            </div>
        </Modal>
    );
}
