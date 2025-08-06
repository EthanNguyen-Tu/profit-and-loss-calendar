export const formatUSD = (value: number) => {
    if (value === undefined || value === null) return "";
    return `${value > 0 ? "" : "-"}$${Math.abs(value).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

export const getCurrencyColorClass = (value: number) => {
    if (value > 0) return "profit";
    if (value < 0) return "loss";
    return "neutral";
};
