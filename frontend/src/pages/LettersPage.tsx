import { Container } from "react-bootstrap";
import LettersPageLoggedInView from "../components/LettersPageLoggedInView";
import LettersPageLoggedOutView from "../components/LettersPageLoggedOutView";
import styles from "../styles/LettersPage.module.css";
import { User } from "../models/user";

interface LettersPageProps {
    loggedInUser: User | null,
}

const LettersPage = ({ loggedInUser }: LettersPageProps) => {
    return ( 
        <Container className={styles.letterPage}>
            <>
            { loggedInUser 
            ? <LettersPageLoggedInView />
            : <LettersPageLoggedOutView />
            }
            </>
        </Container>
     );
}
 
export default LettersPage;