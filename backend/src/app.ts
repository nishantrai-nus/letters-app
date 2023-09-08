import MongoStore from "connect-mongo/build/main/lib/MongoStore";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import { requiresAuth } from "./middleware/auth";
import lettersRoutes from "./routes/lettersRoutes";
import usersRoutes from "./routes/usersRoutes";
import env from "./util/validateEnv";
import cors from 'cors';

const app = express();

app.use(cors(
    {
        origin: true,
        credentials: true,
    }
))

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
});
app.use("/api/users", usersRoutes);
app.use("/api/letters", lettersRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;