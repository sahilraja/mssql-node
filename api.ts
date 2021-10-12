import { Router } from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status-codes";
import { processErrors } from "./utils/error_handling_utils";
import * as surveyRouter from "./surveys/router"

const router = Router();
router.use(bodyParser.json());

router.get("/", (request: Request, response: Response) => {
    response.status(200).send(`<h1>HELLO APIS ........!"</h1>`);
});

router.use("/surveys", surveyRouter)


//Error handling

router.use((req: Request, res: Response) => {
    res.status(400).send({ "url": 'Undefined endpoint url ' + `${req.baseUrl}${req.path}`, "code": 404 });
})

router.use((error: Error, req: Request, res: Response) => {
    console.log(error);
    res.status(processErrors(error).code || INTERNAL_SERVER_ERROR).send(processErrors(error));
});

router.use((error: any, req: Request, res: Response) => {
    console.log(error)
    res.status(error.code < 600 ? error.code : INTERNAL_SERVER_ERROR || INTERNAL_SERVER_ERROR).send(processErrors(error));
})


export = router;
