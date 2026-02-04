import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../  db/index";
import { sequelize } from "../db/sequelize";


export class InterestAccrual extends Model {
  declare id: string;
  declare walletId: string;
  declare accrualDate: string;
  declare rateApplied: string;
  declare interestAmount: string;
}

InterestAccrual.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    walletId: { type: DataTypes.UUID, allowNull: false },
    accrualDate: { type: DataTypes.DATEONLY, allowNull: false },
    rateApplied: { type: DataTypes.DECIMAL(18, 10), allowNull: false },
    interestAmount: { type: DataTypes.DECIMAL(36, 18), allowNull: false }
  },
  {
    sequelize,
    tableName: "interest_accruals",
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ["wallet_id", "accrual_date"] }]
  }
);
