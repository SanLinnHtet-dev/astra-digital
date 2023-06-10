"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    const merchantPassword = bcrypt.hashSync("123456", salt);
    queryInterface.bulkInsert("merchant", [
      {
        username: "merchant_user",
        password: merchantPassword,
        phoneNo: "09435634",
        email: "merchant@gamil.com",
        image: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_front_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_back_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_no: "4/TAAABA(A)234321",
        dob: "2000-04-20 21:22:46.340000",
        gender: "MALE",
        address_street: "Nana",
        address_township: "Sanchaung",
        address_city: "Yangon",
        address_country: "Myanmar",
        lat: "23.23232343",
        long: "54.46456564",
        merchantType: "EXCLUSIVE_MERCHANT",
        createdAt: "2023-04-20 21:22:46.340000",
        updatedAt: "2023-04-20 21:22:46.340000",
      },
      {
        username: "merchant_user2",
        password: merchantPassword,
        phoneNo: "094356341",
        email: "merchant2@gamil.com",
        image: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_front_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_back_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_no: "4/TABADA(A)432111",
        dob: "2000-04-20 21:22:46.340000",
        gender: "MALE",
        address_street: "Nana",
        address_township: "Sanchaung",
        address_city: "Yangon",
        address_country: "Myanmar",
        lat: "23.23232343",
        long: "54.46456564",
        merchantType: "SELLER_MERCHANT",
        createdAt: "2023-04-20 21:22:46.340000",
        updatedAt: "2023-04-20 21:22:46.340000",
      },
      {
        username: "merchant_user3",
        password: merchantPassword,
        phoneNo: "09435636",
        email: "merchant3@gamil.com",
        image: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_front_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_back_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_no: "4/TABYAD(A)123432111",
        dob: "2000-04-20 21:22:46.340000",
        gender: "MALE",
        address_city: "Yangon",
        address_street: "Shwe Gon Daing",
        address_township: "Bahan",
        address_country: "Myanmar",
        long: "25.345566",
        lat: "22.4656",
        merchantType: "EXCLUSIVE_MERCHANT",
        createdAt: "2023-04-20 21:22:46.340000",
        updatedAt: "2023-04-20 21:22:46.340000",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
