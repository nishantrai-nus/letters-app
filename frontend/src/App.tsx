import React, { useEffect, useState } from 'react';
import { Letter as LetterModel } from './models/letter';
import Letter from './components/letters';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/LettersPage.module.css"
import styleUtils from "./styles/utils.module.css"
import * as LettersApi from "./network/letters_api"
import SendLetterDialog from './components/SendEditLetterDialog';
import {FaPlus} from "react-icons/fa"
import SendEditLetterDialog from './components/SendEditLetterDialog';

function App() {
  const [letters, setLetters] = useState<LetterModel[]>([]);

  const [showSendLetterDialog, setShowSendLetterDialog] = useState(false);
  const [letterToEdit, setLetterToEdit] = useState<LetterModel|null>(null);

  useEffect(() => {
    async function loadLetters() {
      try {
        const letters = await LettersApi.fetchLetters();
        setLetters(letters);
      } catch (error) {
        console.error(error);
        alert(error);
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

  return (
    <Container>
      <Button 
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowSendLetterDialog(true)}>
          <FaPlus />
        Send a new letter
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {letters.map(letter => (
          <Col key = {letter._id}>
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
      { showSendLetterDialog &&
        <SendLetterDialog 
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
    </Container>
  );
}

export default App;
