"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("wallets", [
      {
        id: "11111111-1111-1111-1111-111111111111",
        user_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        currency: "NGN",
        balance: "1000.00",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        user_id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        currency: "NGN",
        balance: "0.00",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wallets", {
      id: [
        "11111111-1111-1111-1111-111111111111",
        "22222222-2222-2222-2222-222222222222"
      ]
    });
  }
};
