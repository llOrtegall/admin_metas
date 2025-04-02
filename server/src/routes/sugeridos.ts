import { getSugeridos } from '../controllers/sugeridos';
import { Router } from 'express';

export const sugeridosRouter = Router();

sugeridosRouter.get('/sugeridos', getSugeridos);