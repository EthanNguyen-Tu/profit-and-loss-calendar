import Modal from "@/components/Modal/Modal";
import { CircleQuestionMark } from "lucide-react";
import IconButton from "@/components/IconButton/IconButton";
import { useState } from "react";
import styles from "./HelpButton.module.css";

export default function HelpButton() {
    const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

    const handleClick = () => {
        setShowHelpModal(!showHelpModal);
    };

    const handleClose = () => {
        setShowHelpModal(false);
    };

    return (
        <>
            <IconButton
                icon={<CircleQuestionMark />}
                onClick={handleClick}
                title={"Help"}
                variant="tertiary"
                style={{ padding: 0 }}
            />
            <Modal
                isOpen={showHelpModal}
                onClose={handleClose}
                title="FAQ"
                style={{
                    maxWidth: "90%",
                    minWidth: "350px",
                    alignItems: "flex-start",
                    fontSize: "0.8rem",
                    zIndex: 999,
                }}
            >
                <h3 className={styles.bold}>Q: How do I get started?</h3>
                You can add your profit or loss and notes for each day by
                clicking on the calendar square representing that day, filling
                in the text boxes of the modal that pops up, and pressing save.
                <h3 className={styles.bold}>
                    Q: How do I &quot;delete&quot; a day?
                </h3>
                Simply click on the calendar square representing that day and
                remove any profit or loss and remove any notes in the respective
                text boxes.
                <h3 className={styles.bold}>
                    Q: How do I change the month or year?
                </h3>
                At the top of the calendar, use the left and right navigation
                controls, or click the month and year to open a month/year
                selector modal. For the P&L Over Time graph, click the drop down
                menu at the top right of the section to specify the time frame
                you desire.
                <h3 className={styles.bold}>Q: How do I save my changes?</h3>
                At the top of the calendar, click &quot;Export&quot; to download
                a .json file of your changes to your computer. Next time you
                open the calendar, click &quot;Import&quot; to upload your .json
                file and restore your changes.
            </Modal>
        </>
    );
}
