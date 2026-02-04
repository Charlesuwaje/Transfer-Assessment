import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../  db/index";
// import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../ db/sequelize";
import { sequelize } from "../db/sequelize";


export class Wallet extends Model {
  declare id: string;
  declare userId: string;
  declare currency: string;
  declare balance: string;
}

Wallet.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.DECIMAL(36, 18), allowNull: false, defaultValue: "0" }
  },
  { sequelize, tableName: "wallets", timestamps: true, underscored: true }
);
