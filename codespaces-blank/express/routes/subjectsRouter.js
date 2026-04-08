import express from "express";
import { getSubjects, addSubjects, getOneSubject, deleteSubject, updateSubject } from "../controllers/subjectsController.js";
import { validateSubject } from"../validation/addSubjectsValidation.js"
import { validateUpdateSubject } from "../validation/updateSubjectValidation.js";
const subjectsRouter = express.Router();
subjectsRouter.get("/", getSubjects);
subjectsRouter.post("/", validateSubject, addSubjects);
subjectsRouter.get("/:id", getOneSubject)
subjectsRouter.delete("/:id", deleteSubject)
subjectsRouter.patch("/:id", validateUpdateSubject, updateSubject)
export default subjectsRouter;