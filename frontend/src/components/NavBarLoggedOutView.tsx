import { Button } from "react-bootstrap";

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