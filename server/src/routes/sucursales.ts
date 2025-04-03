import { getSucursales } from '../controllers/sucursales';
import { Router } from 'express';

export const routerSucursales = Router();

routerSucursales.get('/sucursales', getSucursales);