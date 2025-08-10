import CalendarContext from "@/context/CalendarContext";
import { useContext } from "react";

export default function useCalendar() {
    const calendarContext = useContext(CalendarContext);
    if (!calendarContext) {
        throw new Error("useCalendar must be used within a CalendarProvider");
    }
    return calendarContext;
}
