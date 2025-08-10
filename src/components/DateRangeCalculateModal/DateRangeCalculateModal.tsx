import useCalendar from "@/hooks/useCalendar";
import { formatUSD, getCurrencyColorClass } from "@/lib/currency";
import { Calculator } from "lucide-react";
import { useState } from "react";
import IconButton from "../IconButton/IconButton";
import Modal from "../Modal/Modal";

interface DateRangeCalculateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DateRangeCalculateModal({
    isOpen,
    onClose,
}: DateRangeCalculateModalProps) {
    const { calculateRangePL } = useCalendar();
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);

    const handleCalculate = () => {
        if (startDate && endDate) {
            setResult(
                calculateRangePL(
                    new Date(startDate).getTime(),
                    new Date(endDate).getTime()
                )
            );
        }
    };

    const handleClose = () => {
        setStartDate("");
        setEndDate("");
        setResult(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal
            title="Calculate P&L Range"
            isOpen={isOpen}
            onClose={handleClose}
            ctas={
                <IconButton
                    icon={<Calculator size={16} />}
                    onClick={handleCalculate}
                    disabled={!startDate || !endDate}
                    title="Calculate P&L Range"
                    ariaLabel="Calculate P&L Range"
                    style={{ alignSelf: "flex-end" }}
                >
                    Calculate
                </IconButton>
            }
        >
            <div className="flex-column">
                <div className="inputEntry">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="inputEntry">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="inputEntry">
                    Result:{" "}
                    {result && (
                        <div className={getCurrencyColorClass(result)}>
                            {formatUSD(result)}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
