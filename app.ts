import * as express from "express";
import { initiateDBIfNotExists, sequelize } from "./database";
import { Application, Request, Response, Handler } from "express";
import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from "http-status-codes";
import * as apiRouter from "./api";
import * as logger from "morgan";
import { processErrors } from "./utils/error_handling_utils";
initiateDBIfNotExists()

const app: Application = express();


app.use(logger("dev"));




app.use([`/api`, "/"], apiRouter);

app.use((error: Error, request: Request, response: Response, next: Handler) => {
    console.log(error);
    response.status(processErrors(error).code || INTERNAL_SERVER_ERROR).send(processErrors(error));
});


app.use((error: Error, request: Request, response: Response, next: Handler) => {
    response.status((error as any).code === undefined ? BAD_REQUEST : (error as any).code < 600 ? (error as any).code : INTERNAL_SERVER_ERROR || INTERNAL_SERVER_ERROR).send({ errors: error.message || (error as any).error });
});

export = app;
