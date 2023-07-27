import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/letters_api";
import * as LettersApi from "../network/letters_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { User } from "../models/user";
import { useState } from "react";
import { UnauthorisedError } from "../errors/http_errors";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccessful}: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string|null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    async function onSubmit(credentials:LoginCredentials) {
        try {
            const user = await LettersApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorisedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                Log In
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                <Alert variant="danger">
                    {errorText}
                </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{ required: "Required "}}
                    error={errors.username}
                    />

                    <TextInputField 
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    register={register}
                    registerOptions={{ required: "Required "}}
                    error={errors.password}
                    />
                    
                    <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={styleUtils.width100}
                    >
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;