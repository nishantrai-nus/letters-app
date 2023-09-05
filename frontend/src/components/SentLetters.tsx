import styles from "../styles/Letter.module.css"
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap";
import { Letter as LetterModel } from "../models/letter";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md"

interface LetterProps {
    letter: LetterModel,
    onLetterClicked: (letter: LetterModel) => void,
    onDeleteLetterClicked: (letter: LetterModel) => void,
    className?: string,
}

const Letter = ({ letter, onLetterClicked, onDeleteLetterClicked, className }: LetterProps) => {
    const {
        title,
        text,
        recipientUsername,
        createdAt,
        updatedAt,
    } = letter;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    const recipientUsernameString = "To: " + recipientUsername;

    return (
        <Card className={`${styles.letterCard} ${className}`}
            onClick={() => onLetterClicked(letter)}
        >
            <Card.Body className={styles.letterBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteLetterClicked(letter);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.letterText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className={`text-muted`}>
                <div className="row">
                    <div className="col-md-6">{recipientUsernameString}</div>
                    <div className="col-md-6 text-right">{createdUpdatedText}</div>
                </div>
            </Card.Footer>
        </Card >
    )
}

export default Letter;