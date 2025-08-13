import styles from "./IconButton.module.css";

interface IconButtonProps {
    onClick: () => void;
    title: string;
    ariaLabel?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    variant?: "primary" | "secondary" | "tertiary";
}

export default function IconButton({
    onClick,
    title,
    ariaLabel,
    children,
    disabled,
    icon,
    style,
    variant = "primary",
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${styles[variant]}`}
            aria-label={ariaLabel}
            title={title}
            style={style}
            disabled={disabled}
        >
            {icon}
            {children && <div className={styles.content}>{children}</div>}
        </button>
    );
}
