import { getSucursales, getSucursalByCodigo, updateSucursal } from '../controllers/sucursales';
import { Router } from 'express';

export const routerSucursales = Router();

routerSucursales.get('/sucursales', getSucursales);

routerSucursales.get('/sucursal/:codigo', getSucursalByCodigo);

routerSucursales.patch('/sucursal/:codigo', updateSucursal);