import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as LettersApi from "./network/letters_api";
import LettersPage from './pages/LettersPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from "./styles/App.module.css"

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
							element={<LettersPage loggedInUser={loggedInUser} />}
						/>
						<Route
							path='/privacy'
							element={<PrivacyPage />}
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
