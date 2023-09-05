import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { User as UserModel } from '../models/user';
import { Letter } from "../models/letter";
import { useForm } from "react-hook-form";
import { LetterInput } from "../network/letters_api";
import * as LettersApi from "../network/letters_api";
import TextInputField from "./form/TextInputField";

interface SendEditLetterDialogProps {
    letterToEdit?: Letter,
    onDismiss: () => void,
    onLetterSaved: (letter: Letter) => void,
}

const SendEditLetterDialog = ({ letterToEdit, onDismiss, onLetterSaved }: SendEditLetterDialogProps) => {

    const [users, setUsers] = useState<UserModel[]>([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await LettersApi.getUsers();
                setUsers(users);
                console.log("users loaded");
                if (letterToEdit) {
                    setSelectedUser(letterToEdit.recipientUsername);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [letterToEdit]);

    const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(event.target.value);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LetterInput>({
        defaultValues: {
            title: letterToEdit?.title || "",
            text: letterToEdit?.text || "",
            recipientUsername: letterToEdit?.recipientUsername || "",
        }
    });

    async function onSubmit(input: LetterInput) {
        try {
            input.recipientUsername = selectedUser;
            let letterResponse: Letter;
            if (letterToEdit) {
                letterResponse = await LettersApi.updateLetter(letterToEdit._id, input);
            } else {
                letterResponse = await LettersApi.createLetter(input);
            }
            onLetterSaved(letterResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal size="lg" show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {letterToEdit ? "Edit letter" : "Send letter"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="sendEditLetterForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />

                    <Form.Select value={selectedUser} onChange={handleUserChange}>
                        <option>Select a user</option>
                        {users.map((user) => (
                            <option key={user.username} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </Form.Select>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="sendEditLetterForm"
                    disabled={isSubmitting}
                >
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SendEditLetterDialog;