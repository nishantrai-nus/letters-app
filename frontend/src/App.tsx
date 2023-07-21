import React, { useEffect, useState } from 'react';
import { Letter as LetterModel } from './models/letter';
import Letter from './components/Letter';
import { Col, Container, Row } from 'react-bootstrap';
import styles from "./styles/LettersPage.module.css"

function App() {
  const [letters, setLetters] = useState<LetterModel[]>([]);

  useEffect(() => {
    async function loadLetters() {
      try {
        const response = await fetch("/api/letters", { method: "GET"});
        const letters = await response.json();
        setLetters(letters);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadLetters();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">

        {letters.map(letter => (
          <Col key = {letter._id}>
            <Letter letter={letter} className={styles.letter} key={letter._id}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
