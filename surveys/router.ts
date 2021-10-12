import { Router } from "express";
import { OK } from "http-status-codes";
import { processMongooseErrors } from "../utils/error_handling_utils";
import {
    readSurvey,
    activateSurvey,
    createSurvey,
    deActivateSurvey,
    listSurveys,
    updateSurvey,
} from "./module";
let router = Router();

router.param("id", async (req: any, res, next, id) => {
    try {
        req.object = await readSurvey(id);
        if (!req.object) {
            return next(new Error("No such survey found"));
        }
        next();
    } catch (error) {
        next(processMongooseErrors(error));
    }
});

router.post("/create", async (req, res, next) => {
    try {
        res.status(OK).send(await createSurvey(req.body));
    } catch (error) {
        next(processMongooseErrors(error));
    }
});

router.get("/", async (req, res, next) => {
    try {
        res
            .status(OK)
            .send(await listSurveys(req.query, req.headers.authorization));
    } catch (error) {
        next(processMongooseErrors(error));
    }
});

router.get("/active", async (req, res, next) => {
    try {
        res
            .status(OK)
            .send(
                await listSurveys(
                    { ...req.query, is_active: true },
                    req.headers.authorization
                )
            );
    } catch (error) {
        next(processMongooseErrors(error));
    }
});

router.get(["/:id", "/:id/detail"], async (req, res, next) => {
    try {
        res.status(OK).send(await readSurvey(req.params.id));
    } catch (error) {
        next(processMongooseErrors(error));
    }
});

router.get("/:id/activate", async (req, res, next) => {
    try {
        res.status(OK).send(await activateSurvey(req.params.id));
    } catch (error) {
        next(processMongooseErrors(error));
    }
});

router.get("/:id/deactivate", async (req, res, next) => {
    try {
        res.status(OK).send(await deActivateSurvey(req.params.id));
    } catch (error) {
        next(processMongooseErrors(error));
    }
});

router.post("/:id/update", async (req, res, next) => {
    try {
        res.status(OK).send(await updateSurvey(req.params.id, req.body));
    } catch (error) {
        next(processMongooseErrors(error));
    }
});


export = router;
