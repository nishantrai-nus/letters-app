import { RequestHandler } from "express";
import LetterModel from "../models/letter";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getSentLetters: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const letters = await LetterModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(letters);
    }
    catch (error) {
        next(error);
    }
};

export const getReceivedLetters: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const currUser = await UserModel.findById(authenticatedUserId).exec();

        if (!currUser) {
            throw createHttpError(404, "HUH YOU DONT EXIST?");
        }

        const letters = await LetterModel.find({ recipientUsername: currUser.username }).exec();
        res.status(200).json(letters);
    }
    catch (error) {
        next(error);
    }
};

export const getLetter: RequestHandler = async (req, res, next) => {
    const letterId = req.params.letterId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(letterId)) {
            throw createHttpError(400, "Invalid letter id");
        }

        const letter = await LetterModel.findById(letterId).exec();

        if (!letter) {
            throw createHttpError(404, "Letter not found");
        }

        if (!letter.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this letter");
        }

        res.status(200).json(letter)
    } catch (error) {
        next(error)
    }
}

interface CreateLetterBody {
    title?: string,
    text?: string,
    recipientUsername?: string,
}

export const sendLetter: RequestHandler<unknown, unknown, CreateLetterBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;
    const recipientUsername = req.body.recipientUsername;

    try {
        assertIsDefined(authenticatedUserId);
        if (!title) {
            throw createHttpError(400, "Letter must have a title");
        }

        const recipientUser = await UserModel.findOne({ username: recipientUsername }).exec();
        if (!recipientUser) {
            throw createHttpError(404, "That username wasn't found");
        }

        const newLetter = await LetterModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
            recipientUsername: recipientUsername,
        });

        res.status(201).json(newLetter);
    } catch (error) {
        next(error);
    }
}

interface UpdateLetterParams {
    letterId: string,
}

interface UpdateLetterBody {
    title?: string,
    text?: string,
    recipientUsername?: string,
}

export const updateLetter: RequestHandler<UpdateLetterParams, unknown, UpdateLetterBody, unknown> = async (req, res, next) => {
    const letterId = req.params.letterId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newRecipientUsername = req.body.recipientUsername;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(letterId)) {
            throw createHttpError(400, "Invalid letter id");
        }

        const letter = await LetterModel.findById(letterId).exec();

        if (!letter) {
            throw createHttpError(404, "Letter not found");
        }

        if (!letter.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this letter");
        }

        const newRecipientUser = await UserModel.findOne({ username: newRecipientUsername }).exec();
        if (!newRecipientUser) {
            throw createHttpError(404, "that username wasnt found");
        }

        letter.title = newTitle ? newTitle : letter.title;
        letter.text = newText ? newText : letter.text;
        letter.recipientUsername = newRecipientUsername ? newRecipientUsername : letter.recipientUsername;

        const updatedLetter = await letter.save();

        res.status(200).json(updatedLetter);
    } catch (error) {
        next(error);
    }
}

export const deleteLetter: RequestHandler = async (req, res, next) => {
    const letterId = req.params.letterId;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(letterId)) {
            throw createHttpError(400, "Invalid letter id");
        }

        const letter = await LetterModel.findById(letterId).exec();

        if (!letter) {
            throw createHttpError(404, "Letter not found");
        }

        if (!letter.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this letter");
        }

        await letter.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }

}