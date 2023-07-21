import { RequestHandler } from "express";
import LetterModel from "../models/letter";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
        if (!mongoose.isValidObjectId(letterId)) {
            throw createHttpError(400, "Invalid letter id");
        }
        
        const letter = await LetterModel.findById(letterId).exec();

        if (!letter) {
            throw createHttpError(404, "Letter not found");
        }

        res.status(200).json(letter)
    } catch (error) {
        next(error)
    }
}

interface CreateLetterBody {
    title?: string, 
    text?: string, 
}

export const createLetter: RequestHandler<unknown, unknown, CreateLetterBody, unknown> = async(req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    
    try {
        if (!title) {
            throw createHttpError(400, "Letter must have a title");
        }
        
        const newLetter = await LetterModel.create({
            title: title,
            text: text,
        });

        res.status(201).json(newLetter);
    } catch(error) {
        next(error);
    }
}

interface UpdateLetterParams {
    letterId: string,
}

interface UpdateLetterBody {
    title?: string, 
    text?: string, 
}

export const updateLetter: RequestHandler<UpdateLetterParams, unknown, UpdateLetterBody, unknown> = async(req, res, next) => {
    const letterId = req.params.letterId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(letterId)) {
            throw createHttpError(400, "Invalid letter id");
        }

        const letter = await LetterModel.findById(letterId).exec();

        if (!letter) {
            throw createHttpError(404, "Letter not found");
        }

        letter.title = newTitle ? newTitle : letter.title;
        letter.text = newText ? newText : letter.text;

        const updatedLetter = await letter.save();

        res.status(200).json(updatedLetter);
    } catch(error) {
        next(error);
    }
}

export const deleteLetter: RequestHandler = async (req, res, next) => {
    const letterId = req.params.letterId;
    try {

        if (!mongoose.isValidObjectId(letterId)) {
            throw createHttpError(400, "Invalid letter id");
        }

        const letter = await LetterModel.findById(letterId).exec();

        if (!letter) {
            throw createHttpError(404, "Letter not found");
        }
        
        await letter.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }  

}