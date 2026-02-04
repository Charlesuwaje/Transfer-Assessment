"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("interest_accruals", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      wallet_id: { type: Sequelize.UUID, allowNull: false },
      accrual_date: { type: Sequelize.DATEONLY, allowNull: false },
      rate_applied: { type: Sequelize.DECIMAL(18, 10), allowNull: false },
      interest_amount: { type: Sequelize.DECIMAL(36, 18), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.addConstraint("interest_accruals", {
      fields: ["wallet_id", "accrual_date"],
      type: "unique",
      name: "uniq_wallet_date_interest"
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("interest_accruals");
  }
};
