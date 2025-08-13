import Modal from "@/components/Modal/Modal";
import { Info } from "lucide-react";
import IconButton from "@/components/IconButton/IconButton";
import { useState } from "react";

export default function AboutButton() {
    const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

    const handleClick = () => {
        setShowAboutModal(!showAboutModal);
    };

    const handleClose = () => {
        setShowAboutModal(false);
    };

    return (
        <>
            <IconButton
                icon={<Info />}
                onClick={handleClick}
                title={"About"}
                variant="tertiary"
                style={{ padding: 0 }}
            />
            <Modal
                isOpen={showAboutModal}
                onClose={handleClose}
                title="About"
                style={{
                    maxWidth: "90%",
                    minWidth: "350px",
                    fontSize: "0.8rem",
                    zIndex: 999,
                }}
            >
                <p>
                    Made by Ethan Nguyen-Tu, this application is designed to
                    help you track your daily profit and loss by providing a
                    simple and intuitive interface for entering and viewing your
                    financial data.
                </p>
                <p>
                    All inputted data is stored locally in your browser&apos;s
                    storage, ensuring your information is kept private and
                    secure. You can easily export your data as a JSON file by
                    clicking the &quot;Export&quot; button at the top of the
                    calendar to save your changes. This exported data can then
                    be imported back into the application by clicking the
                    &quot;Import&quot; button when you next open the calendar,
                    allowing you to restore your changes.
                </p>
                <p style={{ textAlign: "center" }}>
                    Copyright © 2025 Ethan Nguyen-Tu. All rights reserved.
                </p>
            </Modal>
        </>
    );
}
