import { Sucursales } from '../models/sucursales.model';
import { Request, Response } from 'express';

export const getSucursales = async (req: Request, res: Response) => {
  try {
    const results = await Sucursales.findAll({
      attributes: ['ZONA', 'CCOSTO', 'CODIGO', 'NOMBRE', 'DIRECCION', 'SUPERVISOR', 'ESTADO'],
      where: {
        ZONA: '39627'
      }
    }) 

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching sucursales:', error);
    res.status(500).json({ error: 'Error fetching sucursales' });
  }
}