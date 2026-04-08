import express from "express";
import { addStudySession, getStudySessions, deleteStudySession } from "../controllers/studySessionsController.js";
import { validateStudySession } from "../validation/addStudySessionValidation.js";
const studySessionsRouter= express.Router();
studySessionsRouter.post("/", validateStudySession, addStudySession);
studySessionsRouter.get("/", getStudySessions);
studySessionsRouter.delete("/:id", deleteStudySession);
export default studySessionsRouter;