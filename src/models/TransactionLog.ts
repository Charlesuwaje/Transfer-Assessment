import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../  db/index";
import { sequelize } from "../db/sequelize";

export type TxStatus = "PENDING" | "SUCCESS" | "FAILED";

export class TransactionLog extends Model {
  declare id: string;
  declare idempotencyKey: string;
  declare fromWalletId: string;
  declare toWalletId: string;
  declare amount: string;
  declare status: TxStatus;
  declare errorMessage: string | null;
}

TransactionLog.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    idempotencyKey: { type: DataTypes.STRING, allowNull: false, unique: true },
    fromWalletId: { type: DataTypes.UUID, allowNull: false },
    toWalletId: { type: DataTypes.UUID, allowNull: false },
    amount: { type: DataTypes.DECIMAL(36, 18), allowNull: false },
    status: { type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"), allowNull: false },
    errorMessage: { type: DataTypes.STRING, allowNull: true }
  },
  { sequelize, tableName: "transaction_logs", timestamps: true, underscored: true }
);
