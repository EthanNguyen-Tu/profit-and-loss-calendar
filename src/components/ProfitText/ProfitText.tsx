import { formatUSD, getCurrencyColorClass } from "@/lib/currency";
import styles from "./ProfitText.module.css";

interface ProfitTextProps {
    amount: number;
    prefix?: string;
}

export default function ProfitText({ amount, prefix }: ProfitTextProps) {
    return (
        <div
            className={`${styles.profitText} ${getCurrencyColorClass(amount)}`}
            title={prefix + "Profit/Loss"}
        >
            {formatUSD(amount)}
        </div>
    );
}
