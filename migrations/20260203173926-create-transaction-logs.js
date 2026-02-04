"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaction_logs", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      idempotency_key: { type: Sequelize.STRING, allowNull: false, unique: true },
      from_wallet_id: { type: Sequelize.UUID, allowNull: false },
      to_wallet_id: { type: Sequelize.UUID, allowNull: false },
      amount: { type: Sequelize.DECIMAL(36, 18), allowNull: false },
      status: { type: Sequelize.ENUM("PENDING", "SUCCESS", "FAILED"), allowNull: false },
      error_message: { type: Sequelize.STRING, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("transaction_logs");
  }
};
