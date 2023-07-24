import { Button, Form, Modal } from "react-bootstrap";
import { Letter } from "../models/letter";
import { useForm } from "react-hook-form";
import { LetterInput } from "../network/letters_api";
import * as LettersApi from "../network/letters_api";

interface SendEditLetterDialogProps {
  letterToEdit?: Letter,
  onDismiss: () => void,
  onLetterSaved: (letter: Letter) => void,
}

const SendEditLetterDialog = ({ letterToEdit, onDismiss, onLetterSaved}: SendEditLetterDialogProps) => {

  const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<LetterInput>({
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
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control 
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register("text")}
            />
          </Form.Group>
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