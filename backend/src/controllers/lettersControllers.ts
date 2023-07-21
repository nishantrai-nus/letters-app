import { RequestHandler } from "express";
import LetterModel from "../models/letter";

export const getLetters: RequestHandler = async(req, res, next) => {
    try {
        const letters = await LetterModel.find().exec();
        res.status(200).json(letters);
    }
    catch (error) {
        next(error);
    }
};

export const getLetter: RequestHandler = async(req, res, next) => {
    const letterId = req.params.letterId;
    try {
        const letter = await LetterModel.findById(letterId).exec();
        res.status(200).json(letter)
    } catch (error) {
        next(error)
    }
}

export const createLetter: RequestHandler = async(req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    try {
        const newLetter = await LetterModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newLetter);
    } catch(error) {
        next(error);
    }
}