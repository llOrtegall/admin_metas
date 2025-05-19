import { getAllReports } from "../controllers/transacciones";
import { Router } from "express";

export const TranssRouter = Router()

TranssRouter.get('/reportes', getAllReports)