import { Modal } from "react-bootstrap";
import { Letter } from "../models/letter";
import styleUtils from "../styles/utils.module.css";


interface ViewLetterDialogProps {
    letterToView?: Letter,
    onDismiss: () => void,
}

const ViewLetterDialog = ({ letterToView, onDismiss }: ViewLetterDialogProps) => {
    return (
        <Modal size="lg" show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>{letterToView?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styleUtils.modalBody}>
                <p>{letterToView?.text}</p>
            </Modal.Body>
            <Modal.Footer >
                <p>From: {letterToView?.senderUsername}</p>
            </Modal.Footer>
        </Modal>
    );
}

export default ViewLetterDialog;