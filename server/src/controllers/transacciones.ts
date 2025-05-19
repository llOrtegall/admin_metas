import { Transacciones } from '../models/transacciones.model';
import { Request, Response } from 'express';
import { fn } from 'sequelize';

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Transacciones.findAll({
      where: {
        FECHA: fn('CURDATE')
      }
    });
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
}