"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ledger_entries", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      transaction_log_id: { type: Sequelize.UUID, allowNull: false },
      wallet_id: { type: Sequelize.UUID, allowNull: false },
      direction: { type: Sequelize.ENUM("DEBIT", "CREDIT"), allowNull: false },
      amount: { type: Sequelize.DECIMAL(36, 18), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.addIndex("ledger_entries", ["wallet_id", "created_at"]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable("ledger_entries");
  }
};
