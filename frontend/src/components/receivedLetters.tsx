import styles from "../styles/Letter.module.css"
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap";
import { Letter as LetterModel } from "../models/letter";
import { formatDate } from "../utils/formatDate";
import { send } from "process";

interface ReceivedLetterProps {
    letter: LetterModel,
    onLetterClicked: (letter: LetterModel) => void,
    className?: string,
}

const ReceivedLetter = ({ letter, onLetterClicked, className }: ReceivedLetterProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,
        senderUsername
    } = letter;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    const senderUsernameString = "From: " + senderUsername;

    return (
        <Card className={`${styles.letterCard} ${className}`}
            onClick={() => onLetterClicked(letter)}
        >
            <Card.Body className={styles.letterBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                </Card.Title>
                <Card.Text className={styles.letterText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className={`text-muted`}>
                <div className="row">
                    <div className="col-md-6">{senderUsernameString}</div>
                    <div className="col-md-6 text-right">{createdUpdatedText}</div>
                </div>
            </Card.Footer>
        </Card >
    )
}

export default ReceivedLetter;