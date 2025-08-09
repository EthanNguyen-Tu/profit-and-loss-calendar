import { X } from "lucide-react";
import styles from "./Modal.module.css";
import IconButton from "@/components/IconButton/IconButton";
import { useEffect } from "react";

interface DateRangeModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    ctas?: React.ReactNode;
}

export default function DateRangeSelectorModal({
    children,
    onClose,
    isOpen,
    title,
    ctas,
}: DateRangeModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
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
                {ctas && <div className={styles.ctas}>{ctas}</div>}
            </div>
        </>
    );
}
