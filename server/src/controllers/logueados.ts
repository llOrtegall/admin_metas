import { getAllLogueos } from '../services/logueos';
import { schemaParams } from '../schemas/params';
import { Request, Response } from "express";

export const getLogueados = async (req: Request, res: Response) => {
  try {
    const params = req.query

    const { success, data, error } = schemaParams.safeParse(params);

    if (!success) {
      res.status(400).json({ message: error.format(), });
      return;
    }
  
    const logueos = await getAllLogueos(data.fecha, data.empresa);

    res.status(200).json(logueos);
  } catch (error) {
    console.error('Error in getLogueados:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}