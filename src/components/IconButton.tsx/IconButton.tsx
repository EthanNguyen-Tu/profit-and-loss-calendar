import styles from "./IconButton.module.css";

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    title: string;
    ariaLabel?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function IconButton({
    icon,
    children,
    onClick,
    ariaLabel,
    title,
    style,
}: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className={styles.button}
            aria-label={ariaLabel}
            title={title}
            style={style}
        >
            {icon}
            {children && <div className={styles.content}>{children}</div>}
        </button>
    );
}
