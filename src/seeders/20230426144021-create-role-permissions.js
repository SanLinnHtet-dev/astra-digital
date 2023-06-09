"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM role_permission`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const rolePermissionCount = Object.values(res[0])[0];

    if (!rolePermissionCount) {
      await queryInterface.bulkInsert("role_permission", [
        {
          role_id: 1,
          permission_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: 1,
          permission_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: 1,
          permission_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: 1,
          permission_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role_id: 2,
          permission_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {},
};
