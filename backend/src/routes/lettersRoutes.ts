import express from "express";
import * as LettersController from "../controllers/lettersControllers"

const router = express.Router();

router.get("/", LettersController.getReceivedLetters);

router.get("/sentLetters", LettersController.getSentLetters);

router.get("/:letterId", LettersController.getLetter);

router.post("/sentLetters", LettersController.sendLetter);

router.patch("/:letterId", LettersController.updateLetter);

router.delete("/:letterId", LettersController.deleteLetter);

export default router;