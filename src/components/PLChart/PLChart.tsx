import useCalendar from "@/hooks/useCalendar";
import { abbreviateUSD } from "@/lib/currency";
import { ChartData, DayData } from "@/types/calendar.types";
import { useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "@/components/CustomTooltip/CustomTooltip";
import styles from "./PLChart.module.css";
import ProfitText from "@/components/ProfitText/ProfitText";
import { Colors } from "@/lib/colors";

export const PLChart = () => {
    const { getAllDataInRange } = useCalendar();
    const [chartRange, setChartRange] = useState<string>("currMonth");
    const [customStartDate, setCustomStartDate] = useState<string>("");
    const [customEndDate, setCustomEndDate] = useState<string>("");
    const [showCustomInputs, setShowCustomInputs] = useState<boolean>(false);

    const getDateRange = () => {
        const today = new Date();
        const currYear = today.getFullYear();
        const currMonth = today.getMonth();

        switch (chartRange) {
            case "yearToDate":
                return {
                    start: new Date(currYear, 0, 1).getTime(),
                    end: today.getTime(),
                };
            case "pastYear":
                return {
                    start: new Date(
                        currYear - 1,
                        currMonth,
                        today.getDate()
                    ).getTime(),
                    end: today.getTime(),
                };
            case "custom":
                return {
                    start: new Date(customStartDate).getTime(),
                    end: new Date(customEndDate).getTime(),
                };
            default: // "currMonth"
                return {
                    start: new Date(currYear, currMonth, 1).getTime(),
                    end: new Date(currYear, currMonth + 1, 0).getTime(),
                };
        }
    };

    const { start, end } = getDateRange();
    const data: DayData[] = start && end ? getAllDataInRange(start, end) : [];

    const chartData = data.reduce<ChartData[]>((acc, data) => {
        acc.push({
            displayDate: new Date(data.dateTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year:
                    chartRange === "pastYear" || chartRange === "yearToDate"
                        ? "numeric"
                        : undefined,
            }),
            pl: data.pl,
            cumulativePL:
                acc.length > 0
                    ? acc[acc.length - 1].cumulativePL + data.pl
                    : data.pl,
        });
        return acc;
    }, []);

    const handleRangeChange = (newRange: string) => {
        setShowCustomInputs(newRange === "custom");
        setChartRange(newRange);
    };

    const lineColor = useMemo(() => {
        const lastPoint = chartData[chartData.length - 1]?.cumulativePL ?? 0;
        if (lastPoint > 0) return Colors.profit;
        if (lastPoint < 0) return Colors.loss;
        return Colors.neutral;
    }, [chartData]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className="flex-row">
                    <h2>P&L Over Time</h2>
                    <ProfitText
                        amount={
                            chartData[chartData.length - 1]?.cumulativePL || 0
                        }
                    />
                </div>

                <div className="flex-row">
                    {showCustomInputs && (
                        <div className="flex-column">
                            <div className="inputEntry">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={customStartDate}
                                    onChange={(e) =>
                                        setCustomStartDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="inputEntry">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={customEndDate}
                                    onChange={(e) =>
                                        setCustomEndDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <select
                        value={chartRange}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleRangeChange(e.target.value)
                        }
                        className={styles.selector}
                    >
                        <option value="currMonth">Current Month</option>
                        <option value="yearToDate">Year to Date</option>
                        <option value="pastYear">Past Year</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>
            </div>

            <div className={styles.content}>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart width={500} height={300} data={chartData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={Colors.neutral}
                            />
                            <XAxis
                                dataKey="displayDate"
                                stroke={Colors.neutral}
                                fontSize={12}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                stroke={Colors.neutral}
                                fontSize={12}
                                tickFormatter={(value) =>
                                    abbreviateUSD(value, 0)
                                }
                            />
                            <Tooltip content={CustomTooltip} />
                            <Line
                                type="monotone"
                                dataKey="cumulativePL"
                                stroke={lineColor}
                                strokeWidth={3}
                                dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
                                activeDot={{
                                    r: 6,
                                    stroke: lineColor,
                                    strokeWidth: 2,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className={styles.notice}>
                        No P&L data available for the selected date range.
                    </p>
                )}
            </div>
        </div>
    );
};
