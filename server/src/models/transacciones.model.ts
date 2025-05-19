import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { PowerBI } from '../connections/powerbi'
import { Sucursales } from './sucursales.model';
import { Vendedores } from './vendedores.model';

class Transacciones extends Model<InferAttributes<Transacciones>, InferCreationAttributes<Transacciones>> {
  declare IDTRANSACCION?: number;
  declare FECHA: Date;
  declare SUCURSAL: string;
  declare LOGINSOLICITUD: string;
  declare CONCEPTO: 'PREMIO' | 'NOMINA' | 'OTRO';
  declare VALOR: number;
  declare TERCERO: string;
  declare LOGINAUTORIZA?: string;
  declare ESTADO: 'PENDIENTE' | 'RECHAZADO' | 'APROBADO';
  declare FECHACREATE?: Date;
  declare FECHAUPDATE?: Date;
  declare NOTA?: string;
  declare VERSION?: string;
}

Transacciones.init({
  IDTRANSACCION: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  FECHA: { type: DataTypes.DATEONLY, allowNull: false },
  SUCURSAL: { type: DataTypes.STRING(10), allowNull: false },
  LOGINSOLICITUD: { type: DataTypes.STRING(20), allowNull: false },
  CONCEPTO: { type: DataTypes.ENUM('PREMIO', 'NOMINA', 'OTRO'), allowNull: false },
  VALOR: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  TERCERO: { type: DataTypes.STRING(20), allowNull: false },
  LOGINAUTORIZA: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null},
  ESTADO: { type: DataTypes.ENUM('PENDIENTE', 'RECHAZADO', 'APROBADO'), allowNull: false },
  NOTA: { type: DataTypes.STRING(50), allowNull: true },
  VERSION: { type: DataTypes.STRING(20), allowNull: true }
}, {
  sequelize: PowerBI,
  tableName: 'AUTORIZATRANSACCIONES',
  timestamps: true,
  createdAt: 'FECHACREATE',
  updatedAt: 'FECHAUPDATE'
})

Transacciones.hasOne(Sucursales, {
  foreignKey: 'CODIGO',
  sourceKey: 'SUCURSAL'
})

Transacciones.hasOne(Vendedores, {
  foreignKey: 'DOCUMENTO',
  sourceKey: 'LOGINSOLICITUD'
})

export { Transacciones }