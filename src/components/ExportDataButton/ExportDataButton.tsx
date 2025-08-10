import useCalendar from "@/hooks/useCalendar";
import { Download } from "lucide-react";
import IconButton from "@/components/IconButton/IconButton";

export default function ExportDataButton() {
    const { exportData } = useCalendar();

    const handleExport = () => {
        const data = JSON.stringify(exportData(), null, 2);
        const dataBlob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `pl-calendar-data-${
            new Date().toISOString().split("T")[0]
        }.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <IconButton
            icon={<Download size={16} />}
            onClick={handleExport}
            title="Export Calendar Data"
            ariaLabel={"Export calendar data"}
        >
            Export
        </IconButton>
    );
}
