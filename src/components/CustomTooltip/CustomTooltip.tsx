import { formatUSD, getCurrencyColorClass } from "@/lib/currency";
import styles from "./CustomTooltip.module.css";

interface CustomTooltipProps {
    active?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any[];
    label?: string | number;
}

export const CustomTooltip = ({
    active,
    payload,
    label,
}: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className={styles.container}>
                <p className={styles.title}>{label}</p>
                <p className="inputEntry">
                    Daily P&L:{" "}
                    {data.cumulativePL && (
                        <span className={getCurrencyColorClass(data.pl)}>
                            {formatUSD(data.pl)}
                        </span>
                    )}
                </p>
                <p className="inputEntry">
                    Cumulative Total:{" "}
                    {data.cumulativePL && (
                        <span
                            className={getCurrencyColorClass(data.cumulativePL)}
                        >
                            {formatUSD(data.cumulativePL)}
                        </span>
                    )}
                </p>
            </div>
        );
    }
    return null;
};
