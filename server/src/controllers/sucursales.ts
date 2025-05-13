import { Sucursales } from '../models/sucursales.model';
import { schemaParams } from '../schemas/params';
import { Request, Response } from 'express';

export const getSucursales = async (req: Request, res: Response) => {
  const params = req.query

  const { success, data, error } = schemaParams.safeParse(params);

  if (!success) {
    res.status(400).json({ message: error.format(), });
    return;
  }
  const ZONA = data.empresa === 'Multired' ? 39627 : 39628;

  try {
    const results = await Sucursales.findAll({ where: { ZONA: ZONA } })

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