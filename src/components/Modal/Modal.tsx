import { X } from "lucide-react";
import styles from "./Modal.module.css";
import IconButton from "@/components/IconButton/IconButton";

interface DateRangeModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export default function DateRangeSelectorModal({
    children,
    onClose,
    isOpen,
    title,
}: DateRangeModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{title}</h2>
                <IconButton
                    title="Close"
                    onClick={onClose}
                    icon={<X size={30} />}
                    variant="secondary"
                />
            </div>
            {children}
        </div>
    );
}
