import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes }  from 'sequelize';
import { PowerBI } from '../connections/powerbi';

export class Logueados_Hist extends Model<InferAttributes<Logueados_Hist>, InferCreationAttributes<Logueados_Hist>>{
  declare USERNAME: string;
  declare SUCURSAL: number;
  declare FECHA_LOGIN: Date;
  declare FECHACREATE?: Date;
  declare FECHAUPDATE?: Date;
  declare VERSION: number;
}

Logueados_Hist.init({
  USERNAME: {
    type: DataTypes.STRING(15),
    allowNull: false,
    primaryKey: true
  },
  SUCURSAL: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  FECHA_LOGIN: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    primaryKey: true
  },
  FECHACREATE: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  FECHAUPDATE: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  VERSION: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  sequelize: PowerBI,
  tableName: 'LOGUEADOS_HIST',
  timestamps: false
})