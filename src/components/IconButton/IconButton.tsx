import styles from "./IconButton.module.css";

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    title: string;
    ariaLabel?: string;
    variant?: "primary" | "secondary";
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function IconButton({
    icon,
    children,
    onClick,
    ariaLabel,
    variant = "primary",
    title,
    style,
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${styles[variant]}`}
            aria-label={ariaLabel}
            title={title}
            style={style}
        >
            {icon}
            {children && <div className={styles.content}>{children}</div>}
        </button>
    );
}
