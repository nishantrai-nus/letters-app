import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import { Letter as LetterModel } from '../models/letter';
import * as LettersApi from "../network/letters_api";
import styles from "../styles/LettersPage.module.css";
import ReceivedLetter from './ReceivedLetters';
import ViewLetterDialog from './ViewLetterDialog';

const ReceivedLettersPageLoggedInView = () => {

    const [letters, setLetters] = useState<LetterModel[]>([]);
    const [lettersLoading, setLettersLoading] = useState(true);
    const [showLettersLoadingError, setShowLettersLoadingError] = useState(false);

    const [letterToView, setLetterToView] = useState<LetterModel | null>(null);

    useEffect(() => {
        async function loadLetters() {
            try {
                setShowLettersLoadingError(false);
                setLettersLoading(true);
                const letters = await LettersApi.fetchReceivedLetters();
                setLetters(letters);
            } catch (error) {
                console.error(error);
                setShowLettersLoadingError(true);
            } finally {
                setLettersLoading(false);
            }
        }
        loadLetters();
    }, []);

    const lettersGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.lettersGrid}`}>
            {letters.map(letter => (
                <Col key={letter._id}>
                    <ReceivedLetter
                        letter={letter}
                        className={styles.letter}
                        onLetterClicked={setLetterToView}
                        key={letter._id}
                    />
                </Col>
            ))}
        </Row>


    return (
        <>
            {lettersLoading && <Spinner animation='border' variant='primary' />}
            {showLettersLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!lettersLoading && !showLettersLoadingError &&
                <>
                    {letters.length > 0
                        ? lettersGrid
                        : <p>You don't have any letters yet!</p>
                    }
                </>
            }
            {(letterToView) && 
                <ViewLetterDialog
                    letterToView={letterToView}
                    onDismiss={() => {
                            setLetterToView(null)
                        }
                    }
                />
            }
        </>
    );
}

export default ReceivedLettersPageLoggedInView;