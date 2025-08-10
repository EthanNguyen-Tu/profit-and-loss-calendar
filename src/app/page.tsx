"use client";

import { Calendar } from "@/components/Calendar/Calendar";
import CalendarProvider from "@/providers/CalendarProvider";
import styles from "./page.module.css";

export default function Home() {
    return (
        <CalendarProvider>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1>P&L Calendar</h1>
                    <p>By Ethan Nguyen-Tu</p>
                </div>
                <Calendar />
                <p className={styles.footer}>
                    Copyright © 2025 Ethan Nguyen-Tu. All rights reserved.
                </p>
            </div>
        </CalendarProvider>
    );
}

