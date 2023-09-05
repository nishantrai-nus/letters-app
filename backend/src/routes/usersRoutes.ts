import { requiresAuth } from './../middleware/auth';
import express from "express";
import * as UserController from "../controllers/usersControllers";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.get("/getUsers", UserController.getUsers)

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;