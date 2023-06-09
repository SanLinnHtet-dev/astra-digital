"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    const adminPassword = bcrypt.hashSync("123456", salt);

    await queryInterface.bulkInsert("user", [
      {
        username: "admin_user",
        role_id: 1,
        password: adminPassword,
        email: "admin@gmail.com",
        phoneNo: "09332342334",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "admin_user2",
        role_id: 2,
        password: adminPassword,
        email: "admin2@gmail.com",
        phoneNo: "09332342331",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
