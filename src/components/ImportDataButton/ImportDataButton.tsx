import useCalendar from "@/hooks/useCalendar";
import { Upload } from "lucide-react";
import { useRef } from "react";
import IconButton from "@/components/IconButton/IconButton";

export default function ImportDataButton() {
    const { importData } = useCalendar();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files;
        if (!file || file.length === 0) return;

        const selectedFile = file[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const target = e.target;
                    if (!target || !target.result) {
                        alert("No result from file read");
                        return;
                    }
                    const importedData = JSON.parse(target.result as string);
                    const success = importData(importedData);
                    if (success) {
                        alert("Data imported successfully!");
                    } else {
                        alert("Error importing file. Invalid data format.");
                    }
                } catch {
                    alert(
                        "Error importing file. Please make sure it's a valid JSON file."
                    );
                }
            };
            reader.readAsText(selectedFile);
        }
        event.target.value = ""; // Reset file input
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <IconButton
            icon={<Upload size={16} />}
            onClick={triggerFileInput}
            title="Import Calendar Data"
            ariaLabel="Import calendar data button"
        >
            Import
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
            />
        </IconButton>
    );
}
