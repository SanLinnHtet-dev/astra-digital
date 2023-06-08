"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_role", [
      {
        adminID: 1,
        roleID: 1,
        createdAt: "2023-04-20 21:22:46.340000",
        updatedAt: "2023-04-20 21:22:46.340000",
      },
      {
        adminID: 1,
        roleID: 2,
        createdAt: "2023-04-20 21:22:46.340000",
        updatedAt: "2023-04-20 21:22:46.340000",
      },
      {
        adminID: 1,
        roleID: 3,
        createdAt: "2023-04-20 21:22:46.340000",
        updatedAt: "2023-04-20 21:22:46.340000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
