"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    const customerPassword = bcrypt.hashSync("123456", salt);

    await queryInterface.bulkInsert("customer", [
      {
        username: "customer",
        password: customerPassword,
        email: "customer@gmail.com",
        phoneNo: "09332555765",
        image: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_front_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_back_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_no: "12/BAHANA(n)098765",
        dob: "2000-04-20 21:22:46.340000",
        gender: "MALE",
        address_street: "Nana",
        address_Qtr: "Bahan",
        address_township: "Sanchaung",
        address_city: "Yangon",
        address_country: "Myanmar",
        lat: "27.123156765723",
        long: "37.567655365",
      },
      {
        username: "customer2",
        password: customerPassword,
        email: "customer2@gmail.com",
        phoneNo: "093325765",
        image: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_front_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_back_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_no: "12/BAHANA(n)098765",
        dob: "2000-04-20 21:22:46.340000",
        gender: "MALE",
        address_street: "Nana",
        address_Qtr: "Bahan",
        address_township: "Sanchaung",
        address_city: "Yangon",
        address_country: "Myanmar",
        lat: "27.123123",
        long: "37.5655365",
      },
      {
        username: "customer3",
        password: customerPassword,
        email: "customer3@gmail.com",
        phoneNo: "093325515765",
        image: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_front_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_back_photo: "https://images.pexels.com/photos/5230612/pexels-photo-5230612.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        nrc_no: "12/BAHANA(n)095876",
        dob: "2000-04-20 21:22:46.340000",
        gender: "MALE",
        address_street: "Nana",
        address_Qtr: "Bahan",
        address_township: "Sanchaung",
        address_city: "Yangon",
        address_country: "Myanmar",
        lat: "27.154654623123",
        long: "37.64565432365",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
