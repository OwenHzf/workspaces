import express from "express";
import subjectsRouter from "./subjectsRouter.js";
import studySessionsRouter from"./studySessionsRouter.js"
const router = express.Router();
router.use("/subjects", subjectsRouter);
router.use("/studysessions", studySessionsRouter)
export default router;