import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { PowerBI } from '../connections/powerbi';

export class Sugeridos extends Model<InferAttributes<Sugeridos>, InferCreationAttributes<Sugeridos>> {
  declare ID: number;
  declare FECHA: Date;
  declare ZONA: string;
  declare CCOSTO: string;
  declare SUCURSAL: string;
  declare LOGIN: string;
  declare CATEGORIA: string;
  declare PRODUCTO: string;
  declare VTA_SUGERIDO: number;
  declare FRM_SUGERIDO: number;
  declare META_CANTIDAD: number;
  declare META_VALOR: number;
  declare ESTADO: 'INICIAL' | 'ENPROGRESO' | 'SUPERADO';
  declare VERSION: string;
}

Sugeridos.init({
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FECHA: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ZONA: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  CCOSTO: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  SUCURSAL: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  LOGIN: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  CATEGORIA: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  PRODUCTO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  VTA_SUGERIDO: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  FRM_SUGERIDO: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  META_CANTIDAD: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  META_VALOR: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  ESTADO: {
    type: DataTypes.ENUM('INICIAL', 'ENPROGRESO', 'SUPERADO'),
    allowNull: true
  },
  VERSION: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  sequelize: PowerBI,
  tableName: 'SUGERIDOSVENDEDOR',
  timestamps: false,
})