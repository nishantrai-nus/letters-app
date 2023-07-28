import { Container } from "react-bootstrap";
import ReceivedLettersPageLoggedInView from "../components/ReceivedLettersPageLoggedInView";
import LettersPageLoggedOutView from "../components/LettersPageLoggedOutView";
import styles from "../styles/LettersPage.module.css";
import { User } from "../models/user";

interface ReceivedLettersPageProps {
    loggedInUser: User | null,
}

const ReceivedLettersPage = ({ loggedInUser }: ReceivedLettersPageProps) => {
    return (
        <Container className={styles.letterPage}>
            <>
                {loggedInUser
                    ? <ReceivedLettersPageLoggedInView />
                    : <LettersPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default ReceivedLettersPage;