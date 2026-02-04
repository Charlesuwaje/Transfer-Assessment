"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wallets", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      user_id: { type: Sequelize.UUID, allowNull: false },
      currency: { type: Sequelize.STRING, allowNull: false },
      balance: { type: Sequelize.DECIMAL(36, 18), allowNull: false, defaultValue: "0" },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("wallets");
  }
};
