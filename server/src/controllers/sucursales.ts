import { Sucursales } from '../models/sucursales.model';
import { Request, Response } from 'express';

export const getSucursales = async (req: Request, res: Response) => {
  try {
    const results = await Sucursales.findAll({ where: { ZONA: '39627' } })

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching sucursales:', error);
    res.status(500).json({ error: 'Error fetching sucursales' });
  }
}

export const getSucursalByCodigo = async (req: Request, res: Response) => {
  const { codigo } = req.params;

  try {
    const result = await Sucursales.findOne({ where: { CODIGO: codigo } })

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching sucursal by codigo:', error);
    res.status(500).json({ error: 'Error fetching sucursal by codigo' });
  }
}

export const updateSucursal = async (req: Request, res: Response) => {
  const { codigo } = req.params;

  try {
    const result = await Sucursales.update(req.body, { where: { CODIGO: codigo } })

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating sucursal:', error);
    res.status(500).json({ error: 'Error updating sucursal' });
  }
}