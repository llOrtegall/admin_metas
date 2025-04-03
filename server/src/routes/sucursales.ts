import { getSucursales, getSucursalByCodigo } from '../controllers/sucursales';
import { Router } from 'express';

export const routerSucursales = Router();

routerSucursales.get('/sucursales', getSucursales);

routerSucursales.get('/sucursal/:codigo', getSucursalByCodigo);