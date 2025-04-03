import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { PowerBI } from '../connections/powerbi';

export class Sucursales extends Model<InferAttributes<Sucursales>, InferCreationAttributes<Sucursales>> {
  declare ZONA: string;
  declare CCOSTO: string;
  declare CODIGO: string;
  declare NOMBRE: string;
  declare DIRECCION: string;
  declare TIPO: string;
  declare DISPOSITIVO: string;
  declare SUPERVISOR: string;
  declare CANAL: string;
  declare CATEGORIA: string;
  declare HORA_ENTRADA: Date;
  declare HORA_SALIDA: Date;
  declare HORA_ENTRADA_FES: Date;
  declare HORA_SALIDA_FES: Date;
  declare SUBZONA: string;
  declare CELULA: string;
  declare HORAS_ORDINARIAS: number;
  declare HORAS_FESTIVAS: number;
  declare ESTADO: string;
}

Sucursales.init({
  ZONA: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  CCOSTO: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  CODIGO: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true
  },
  NOMBRE: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  DIRECCION: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  TIPO: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  DISPOSITIVO: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  SUPERVISOR: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  CANAL: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  CATEGORIA: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  HORA_ENTRADA: {
    type: DataTypes.TIME,
    allowNull: true
  },
  HORA_SALIDA: {
    type: DataTypes.TIME,
    allowNull: true
  },
  HORA_ENTRADA_FES: {
    type: DataTypes.TIME,
    allowNull: true
  },
  HORA_SALIDA_FES: {
    type: DataTypes.TIME,
    allowNull: true
  },
  SUBZONA: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  CELULA: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  HORAS_ORDINARIAS: {
    type: DataTypes.INTEGER,
    defaultValue: '8',
    allowNull: true
  },
  HORAS_FESTIVAS: {
    type: DataTypes.INTEGER,
    defaultValue: '6',
    allowNull: true
  },
  ESTADO: {
    type: DataTypes.STRING(5),
    defaultValue: 'A',
    allowNull: true
  }

}, {
  sequelize: PowerBI,
  tableName: 'SUCURSALES',
  timestamps: false
})