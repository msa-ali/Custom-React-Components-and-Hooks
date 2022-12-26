import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

const ModalPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => setIsOpen(isOpen => !isOpen);

    const onClose = () => setIsOpen(false);

    const actionBar = (
        <div>
            <Button appearance="primary" onClick={onClose}>Accept</Button>
        </div>
    );

    const modal = (
        <Modal 
            onClose={onClose} 
            actionBar={actionBar}
        >
            <p>Here is an important agreement for you to accept</p>
        </Modal>
    );

    return (
        <div className="relative">
            <Button appearance="primary" onClick={onClick}>{isOpen ? "Close" : "Open"} Modal</Button>
            {isOpen && modal}
        </div>
    );
}

export default ModalPage;