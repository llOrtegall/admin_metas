import { getLogueados } from "../controllers/logueados";
import { Router } from "express";

export const logueosRouter = Router();

logueosRouter.get("/logueos", getLogueados);