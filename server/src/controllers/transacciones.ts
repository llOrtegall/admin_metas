import { Transacciones } from '../models/transacciones.model';
import { Sucursales } from '../models/sucursales.model';
import { Vendedores } from '../models/vendedores.model';
import { Request, Response } from 'express';
import { fn } from 'sequelize';

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Transacciones.findAll({
      attributes: ['IDTRANSACCION', 'FECHACREATE', 'CONCEPTO', 'ESTADO', 'VALOR'],
      where: {
        FECHA: fn('CURDATE')
      },
      order: [
        ['IDTRANSACCION', 'DESC']
      ]
    });

    const formattedResultsTime = reports.map((result) => ({
      ...result.dataValues,
      FECHACREATE: result.dataValues.FECHACREATE?.toLocaleDateString() + ' ' + result.dataValues.FECHACREATE?.toLocaleTimeString(),
      FECHAUPDATE: result.dataValues.FECHAUPDATE?.toLocaleDateString() + ' ' + result.dataValues.FECHAUPDATE?.toLocaleTimeString()
    }))

    res.json(formattedResultsTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
}

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Transacciones.findOne({
      where: {
        IDTRANSACCION: req.params.id
      },
      include: [
        { 
          attributes: ['ZONA', 'NOMBRE', 'DIRECCION'],
          model: Sucursales 
        },
        { 
          attributes: ['NOMBRES', 'DOCUMENTO', 'NOMBRECARGO'],
          model: Vendedores 
        }
      ],
    });

    if (!report || !report.dataValues) {
      res.status(404).json({ error: 'Reporte no encontrado' });
      return;
    }

    const formattedResultTime = {
      ...report.dataValues,
      FECHACREATE: report.dataValues.FECHACREATE?.toLocaleDateString() + ' ' + report.dataValues.FECHACREATE?.toLocaleTimeString(),
      FECHAUPDATE: report.dataValues.FECHAUPDATE?.toLocaleDateString() + ' ' + report.dataValues.FECHAUPDATE?.toLocaleTimeString()
    }


    res.status(200).json(formattedResultTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el reporte' });
  }
}
