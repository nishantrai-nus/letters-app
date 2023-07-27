import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as LettersApi from "../network/letters_api";

interface NavBarLoggedOutViewProps {
    onLoginClicked: () => void,
    onSignUpClicked: () => void,
}

const NavBarLoggedOutView = ({ onLoginClicked, onSignUpClicked }: NavBarLoggedOutViewProps) => {

    return (
        <>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
            <Button onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;