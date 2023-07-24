import { Button, Form, Modal } from "react-bootstrap";
import { Letter } from "../models/letter";
import { useForm } from "react-hook-form";
import { createLetter, LetterInput } from "../network/letters_api";

interface SendLetterDialogProps {
  onDismiss: () => void,
  onLetterSent: (letter: Letter) => void,
}

const SendLetterDialog = ({onDismiss, onLetterSent}: SendLetterDialogProps) => {

  const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<LetterInput>();

  async function onSubmit(input: LetterInput) {
    try {
      const letterResponse = await createLetter(input);
      onLetterSent(letterResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return ( 
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Send Letter
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="sendLetterForm" onSubmit={handleSubmit(onSubmit)}>
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
          form="sendLetterForm"
          disabled={isSubmitting}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
   );
}
 
export default SendLetterDialog;