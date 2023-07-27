import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Letter as LetterModel } from '../models/letter';
import * as LettersApi from "../network/letters_api";
import SendEditLetterDialog from "./SendEditLetterDialog";
import Letter from './letters';
import styles from "../styles/LettersPage.module.css";
import styleUtils from "../styles/utils.module.css";

const LettersPageLoggedInView = () => {

	const [letters, setLetters] = useState<LetterModel[]>([]);
	const [lettersLoading, setLettersLoading] = useState(true);
	const [showLettersLoadingError, setShowLettersLoadingError] = useState(false);

	const [showSendLetterDialog, setShowSendLetterDialog] = useState(false);
	const [letterToEdit, setLetterToEdit] = useState<LetterModel | null>(null);
    
    useEffect(() => {
		async function loadLetters() {
			try {
				setShowLettersLoadingError(false);
				setLettersLoading(true);
				const letters = await LettersApi.fetchLetters();
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

	async function deleteLetter(letter: LetterModel) {
		try {
			await LettersApi.deleteLetter(letter._id);
			setLetters(letters.filter(existingLetter => existingLetter._id !== letter._id))
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	const lettersGrid =
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.lettersGrid}`}>
			{letters.map(letter => (
				<Col key={letter._id}>
					<Letter
						letter={letter}
						className={styles.letter}
						onLetterClicked={setLetterToEdit}
						onDeleteLetterClicked={deleteLetter}
						key={letter._id}
					/>
				</Col>
			))}
		</Row>


    return ( 
        <>
            <Button
					className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
					onClick={() => setShowSendLetterDialog(true)}>
					<FaPlus />
					Send a new letter
				</Button>
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
				{showSendLetterDialog &&
					<SendEditLetterDialog
						onDismiss={() => setShowSendLetterDialog(false)}
						onLetterSaved={(newLetter) => {
							setLetters([...letters, newLetter])
							setShowSendLetterDialog(false);
						}}
					/>
				}
				{letterToEdit &&
					<SendEditLetterDialog
						letterToEdit={letterToEdit}
						onDismiss={() => setLetterToEdit(null)}
						onLetterSaved={(updatedLetter) => {
							setLetters(letters.map(existingLetter => existingLetter._id === updatedLetter._id ? updatedLetter : existingLetter))
							setLetterToEdit(null);
						}}
					/>
				}
            </>
     );
}
 
export default LettersPageLoggedInView;