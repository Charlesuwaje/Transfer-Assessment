import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../  db/index";
import { sequelize } from "../db/sequelize";

export type LedgerDirection = "DEBIT" | "CREDIT";

export class LedgerEntry extends Model {
  declare id: string;
  declare transactionLogId: string;
  declare walletId: string;
  declare direction: LedgerDirection;
  declare amount: string;
}

LedgerEntry.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    transactionLogId: { type: DataTypes.UUID, allowNull: false },
    walletId: { type: DataTypes.UUID, allowNull: false },
    direction: { type: DataTypes.ENUM("DEBIT", "CREDIT"), allowNull: false },
    amount: { type: DataTypes.DECIMAL(36, 18), allowNull: false }
  },
  { sequelize, tableName: "ledger_entries", timestamps: true, underscored: true }
);
