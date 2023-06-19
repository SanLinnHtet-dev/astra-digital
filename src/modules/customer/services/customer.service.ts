import { Op, QueryTypes } from "sequelize";
import AppError from "../../../utils/appError";
import Customer from "../../../models/customer.model";
import { AppMessageModelNotFound } from "../../../constants/message.constant";
import { sequelize } from "../../../models";

export default class CustomerService {
  static findCustomerByUsernameOrEmailOrPhoneOrNrc = async (
    username: string,
    email: string,
    phoneNo: string,
    nrc_no: string
  ) => {
    const customer = await Customer.findOne({
      where: {
        [Op.or]: {
          username,
          email,
          phoneNo,
          nrc_no,
        },
      },
    });

    if (!customer) return null;

    return customer.toJSON();
  };

  static findCustomerByUsername_binarySearch = async (username: string) => {
    const q = `select * from customer where username LIKE BINARY ? limit 1`;

    const [customer] = await sequelize.query(q, {
      replacements: [username],
      type: QueryTypes.SELECT,
    });

    if (!customer) return null;

    return customer;
  };

  static findCustomerById = async (id: number) => {
    const customer = await Customer.findByPk(id);

    if (!customer) throw new AppError(AppMessageModelNotFound("Customer"), 404);

    return customer.toJSON();
  };
}
