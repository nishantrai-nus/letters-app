import express from "express";
import * as LettersController from "../controllers/lettersControllers"

const router = express.Router();

router.get("/", LettersController.getLetters);

router.get("/:letterId", LettersController.getLetter);

router.post("/", LettersController.createLetter);

router.patch("/:letterId", LettersController.updateLetter);

router.delete("/:letterId", LettersController.deleteLetter);

export default router;