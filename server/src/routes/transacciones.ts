import { getAllReports, getReportById, updateDeniedReport } from "../controllers/transacciones";
import { Router } from "express";

export const TranssRouter = Router()

TranssRouter.get('/reportes', getAllReports)

TranssRouter.get('/reporte/:id', getReportById)

TranssRouter.put('/rechazar', updateDeniedReport)
