import { getSugeridosQuery } from '../services/sugeridos';
import { schemaParams } from '../schemas/params';
import { Request, Response } from 'express';

export const getSugeridos = async (req: Request, res: Response) => {
  const params = req.query

  const { success, data, error } = schemaParams.safeParse(params);

  if (!success) {
    res.status(400).json({ message: error.format(), });
    return;
  }

  try {
    const sugeridos = await getSugeridosQuery(data.fecha, data.empresa);
    res.status(200).json(sugeridos);
  } catch (error) {
    console.error('Error fetching sugeridos:', error);
    res.status(500).json({ error: 'Error fetching sugeridos' });
  }
}