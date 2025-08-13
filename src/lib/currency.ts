export const formatUSD = (value: number, fractionDigits: number = 2) => {
    if (value === undefined || value === null) return "";
    return `${value > 0 ? "" : "-"}$${Math.abs(value).toLocaleString("en-US", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    })}`;
};

export const getCurrencyColorClass = (value: number) => {
    if (value > 0) return "profit";
    if (value < 0) return "loss";
    return "neutral";
};

export const abbreviateUSD = (
    value: number,
    fractionDigits: number = 3
): string => {
    if (value >= 1000000000)
        return formatUSD(value / 1000000000, fractionDigits) + "B";
    if (value >= 1000000)
        return formatUSD(value / 1000000, fractionDigits) + "M";
    if (value >= 1000) return formatUSD(value / 1000, fractionDigits) + "k";
    return formatUSD(value, fractionDigits);
};
