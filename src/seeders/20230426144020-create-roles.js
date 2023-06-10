
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM role`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const rolesCount = Object.values(res[0])[0];

    if (!rolesCount) {
      await queryInterface.bulkInsert("role", [
        {
          roleName: "Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: "System Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: "Sub Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {},
};

