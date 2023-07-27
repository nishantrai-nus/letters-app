import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as LettersApi from "./network/letters_api";
import styles from "./styles/LettersPage.module.css";
import LettersPageLoggedInView from './components/LettersPageLoggedInView';
import LettersPageLoggedOutView from './components/LettersPageLoggedOutView';

function App() {

	const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => {
	  async function fetchLoggedInUser() {
		try {
			const user = await LettersApi.getLoggedInUser();
			setLoggedInUser(user);
		} catch (error) {
			console.error(error)
		}
	  }
	  fetchLoggedInUser();
	}, [])
	

	return (
		<div>
			<NavBar 
			loggedInUser={loggedInUser}
			onLoginClicked={() => setShowLoginModal(true)}
			onSignUpClicked={() => setShowSignUpModal(true)}
			onLogoutSuccessful={() => setLoggedInUser(null)}
			/>
			<Container className={styles.letterPage}>
				<>
				{ loggedInUser 
				? <LettersPageLoggedInView />
				: <LettersPageLoggedOutView />
				}
				</>
			</Container>

			{ showLoginModal &&
			<LoginModal
			onDismiss={() => {setShowLoginModal(false)}}
			onLoginSuccessful={(user) => {
				setLoggedInUser(user);
				setShowLoginModal(false);
			}}
			/>
			}
			{ showSignUpModal &&
			<SignUpModal
			onDismiss={() => {setShowSignUpModal(false)}}
			onSignUpSuccessful={(user) => { 
				setLoggedInUser(user);
				setShowLoginModal(false);
			}}
			/>
			}
		</div>
	);
}

export default App;
