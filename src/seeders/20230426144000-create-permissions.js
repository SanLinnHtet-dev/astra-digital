"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await queryInterface.sequelize.query(
      `select count(*) from permission`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const permissionCount = Object.values(res[0])[0];

    if (!permissionCount) {
      await queryInterface.bulkInsert("permission", [
        
        // admins
        {
          name: "View",
          action: "readAny",
          group: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Create",
          action: "createAny",
          group: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Update",
          action: "updateAny",
          group: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Delete",
          action: "deleteAny",
          group: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // merchant
        {
          name: "View",
          action: "readAny",
          group: "Merchant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Create",
          action: "createAny",
          group: "Merchant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Update",
          action: "updateAny",
          group: "Merchant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Delete",
          action: "deleteAny",
          group: "Merchant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ]);
    }
  },

  async down(queryInterface, Sequelize) {},
};
