import { Button, Form, Modal } from "react-bootstrap";
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

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LetterInput>({
        defaultValues: {
            title: letterToEdit?.title || "",
            text: letterToEdit?.text || "",
        }
    });

    async function onSubmit(input: LetterInput) {
        try {
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
        <Modal show onHide={onDismiss}>
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