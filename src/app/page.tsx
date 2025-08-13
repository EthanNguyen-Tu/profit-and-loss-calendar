"use client";

import { Calendar } from "@/components/Calendar/Calendar";
import CalendarProvider from "@/providers/CalendarProvider";
import styles from "./page.module.css";
import { PLChart } from "@/components/PLChart/PLChart";
import HelpButton from "@/components/HelpButton/HelpButton";
import AboutButton from "@/components/AboutButton/AboutButton";

export default function Home() {
    return (
        <CalendarProvider>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1>P&L Calendar</h1>
                    <p>By Ethan Nguyen-Tu</p>
                    <AboutButton />
                    <HelpButton />
                </div>
                <Calendar />
                <PLChart />
                <p className={styles.footer}>
                    Copyright © 2025 Ethan Nguyen-Tu. All rights reserved.
                </p>
            </div>
        </CalendarProvider>
    );
}

