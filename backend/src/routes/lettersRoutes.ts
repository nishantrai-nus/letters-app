import express from "express";
import * as LettersController from "../controllers/lettersControllers"

const router = express.Router();

router.get("/", LettersController.getLetters);

router.get("/:letterId", LettersController.getLetter);

router.post("/", LettersController.createLetter); 

export default router;