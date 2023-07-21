import styles from "../styles/Letter.module.css"
import { Card } from "react-bootstrap";
import { Letter as LetterModel } from "../models/letter";
import { formatDate } from "../utils/formatDate";

interface LetterProps {
    letter: LetterModel,
    className?: string,
}

const Letter = ({ letter, className } : LetterProps) => {
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
        <Card className={`${styles.letterCard} ${className}`}>
            <Card.Body className={styles.letterBody}>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={styles.letterText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Letter;