import { Transacciones } from '../models/transacciones.model';
import { Request, Response } from 'express';
import { fn } from 'sequelize';

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Transacciones.findAll({
      attributes: ['IDTRANSACCION', 'FECHACREATE', 'CONCEPTO', 'ESTADO', 'VALOR' ],
      where: {
        FECHA: fn('CURDATE')
      },
      order: [
        ['IDTRANSACCION', 'DESC']
      ]
    });
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
}

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Transacciones.findByPk(req.params.id);
    if (!report) {
      res.status(404).json({ error: 'Reporte no encontrado' });
      return;
    }
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el reporte' });
  }
}
  