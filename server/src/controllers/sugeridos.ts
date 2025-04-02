import { getSugeridosQuery } from '../services/sugeridos';
import { Request, Response } from 'express';
import { z } from 'zod';

const schemaParams = z.object({
  fecha: z.string().optional().default(''),
  empresa: z.string().min(3).max(16)
})

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