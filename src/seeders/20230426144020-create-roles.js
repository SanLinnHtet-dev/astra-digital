"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("role", [
      {
        roleName: "Admin List",
        uri: "admin_list",
        isChildRole: false,
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        roleName: "Customer List",
        uri: "customer_list",
        isChildRole: false,
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
      {
        roleName: "Merchant List",
        uri: "merchant_list",
        isChildRole: false,
        createdAt: "2023-05-01 21:22:46.340000",
        updatedAt: "2023-05-01 21:22:46.340000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
