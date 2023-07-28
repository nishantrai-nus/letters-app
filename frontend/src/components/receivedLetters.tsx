import styles from "../styles/Letter.module.css"
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap";
import { Letter as LetterModel } from "../models/letter";
import { formatDate } from "../utils/formatDate";

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
    } = letter;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card className={`${styles.letterCard} ${className}`}
            onClick={() => onLetterClicked(letter)}
        >
            <Card.Body className={styles.letterBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <p>{ }</p>
                </Card.Title>
                <Card.Text className={styles.letterText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className={`text-muted`}>
                {createdUpdatedText}
            </Card.Footer>
        </Card >
    )
}

export default ReceivedLetter;