import { Op, QueryTypes } from "sequelize";
import Merchant from "../../../models/merchant.model";
import AppError from "../../../utils/appError";
import { AppMessageModelNotFound } from "../../../constants/message.constant";
import { sequelize } from "../../../models";

export default class MerchantService {
  static findMerchantByUsernameOrEmailOrPhoneNoOrNrc = async (
    username: string,
    email: string,
    phoneNo: string,
    nrc_no: string,
  ) => {
    const merchant = await Merchant.findOne({
      where: {
        [Op.or]: {
          username,
          email,
          phoneNo,
          nrc_no,
        },
      },
    });

    if (!merchant) return null;

    return merchant.toJSON();
  };

  static findMerchantByUsername_binarySearch = async (username: string) => {
    const q = `select * from merchant where username LIKE BINARY ? limit 1`;

    const [merchant] = await sequelize.query(q, {
      replacements: [username],
      type: QueryTypes.SELECT,
    });

    if (!merchant) return null;

    return merchant;
  };

  static findMerchantById = async (id: number) => {
    const merchant = await Merchant.findByPk(id);

    if (!merchant) throw new AppError(AppMessageModelNotFound("Admin"), 404);

    return merchant.toJSON();
  };
}
