import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { PowerBI } from '../connections/powerbi';

class Vendedores extends Model<InferAttributes<Vendedores>, InferCreationAttributes<Vendedores>> {
  declare DOCUMENTO: string;
  declare NOMBRES: string;
  declare GRPVTAS_CODIGO: string;
  declare CARGO: string;
  declare VERSION: string;
  declare NOMBRECARGO: string;
  declare CCOSTO: string;
}

Vendedores.init({
  DOCUMENTO: { type: DataTypes.STRING(20), allowNull: false, primaryKey: true },
  NOMBRES: { type: DataTypes.STRING(60), allowNull: true },
  GRPVTAS_CODIGO: { type: DataTypes.STRING(30), allowNull: true },
  CARGO: { type: DataTypes.STRING(30), allowNull: true },
  VERSION: { type: DataTypes.STRING(20), allowNull: true },
  NOMBRECARGO: { type: DataTypes.STRING(30), allowNull: true },
  CCOSTO: { type: DataTypes.STRING(10), allowNull: true }
}, {
  sequelize: PowerBI,
  tableName: 'VENDEDORES',
  timestamps: false
})

export { Vendedores }
