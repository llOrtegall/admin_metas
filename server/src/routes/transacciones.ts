import { getAllReports, getReportById } from "../controllers/transacciones";
import { Router } from "express";

export const TranssRouter = Router()

TranssRouter.get('/reportes', getAllReports)

TranssRouter.get('/reporte/:id', getReportById)
  