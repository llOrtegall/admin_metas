import { DB_POWERBI_DATABASE, DB_POWERBI_HOST, DB_POWERBI_PASS, DB_POWERBI_PORT, DB_POWERBI_USER } from '../config/envSchema';
import { Sequelize } from 'sequelize';

export const PowerBI = new Sequelize(DB_POWERBI_DATABASE, DB_POWERBI_USER, DB_POWERBI_PASS, {
  host: DB_POWERBI_HOST,
  port: DB_POWERBI_PORT,
  dialect: 'mysql',
  timezone: '-00:00',
  logging: false
});