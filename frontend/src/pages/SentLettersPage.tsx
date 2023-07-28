import { Container } from "react-bootstrap";
import SentLettersPageLoggedInView from "../components/SentLettersPageLoggedInView";
import LettersPageLoggedOutView from "../components/LettersPageLoggedOutView";
import styles from "../styles/LettersPage.module.css";
import { User } from "../models/user";

interface SentLettersPageProps {
    loggedInUser: User | null,
}

const SentLettersPage = ({ loggedInUser }: SentLettersPageProps) => {
    return (
        <Container className={styles.letterPage}>
            <>
                {loggedInUser
                    ? <SentLettersPageLoggedInView />
                    : <LettersPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default SentLettersPage;