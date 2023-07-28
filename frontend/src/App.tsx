import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as LettersApi from "./network/letters_api";
import SentLettersPage from './pages/SentLettersPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from "./styles/App.module.css"
import ReceivedLettersPage from './pages/ReceivedLettersPage';

function App() {

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

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
		<BrowserRouter>
			<div>
				<NavBar
					loggedInUser={loggedInUser}
					onLoginClicked={() => setShowLoginModal(true)}
					onSignUpClicked={() => setShowSignUpModal(true)}
					onLogoutSuccessful={() => setLoggedInUser(null)}
				/>

				<Container className={styles.pageContainer}>
					<Routes>
						<Route
							path='/'
							element={<ReceivedLettersPage loggedInUser={loggedInUser} />}
						/>
						<Route
							path='/sentLetters'
							element={<SentLettersPage loggedInUser={loggedInUser} />}
						/>
						<Route
							path='/*'
							element={<NotFoundPage />}
						/>
					</Routes>
				</Container>

				{showLoginModal &&
					<LoginModal
						onDismiss={() => { setShowLoginModal(false) }}
						onLoginSuccessful={(user) => {
							setLoggedInUser(user);
							setShowLoginModal(false);
						}}
					/>
				}
				{showSignUpModal &&
					<SignUpModal
						onDismiss={() => { setShowSignUpModal(false) }}
						onSignUpSuccessful={(user) => {
							setLoggedInUser(user);
							setShowSignUpModal(false);
						}}
					/>
				}
			</div>
		</BrowserRouter>
	);
}

export default App;
