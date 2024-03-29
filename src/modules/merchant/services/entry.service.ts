import { Op, QueryTypes } from "sequelize";
import EntryMerchant from "../../../models/entry_merchant.model";
import AppError from "../../../utils/appError";
import { AppMessageModelNotFound } from "../../../constants/message.constant";
import { sequelize } from "../../../models";

export default class EntryMerchantService {
  static findEntryMerchantByEmailOrPhoneNoOrNrc = async (
    email: string,
    phoneNo: string,
    nrc_no: string,
  ) => {
    const entry_merchant = await EntryMerchant.findOne({
      where: {
        [Op.or]: {
          email,
          phoneNo,
          nrc_no,
        },
      },
    });

    if (!entry_merchant) return null;

    return entry_merchant.toJSON();
  };

  static findEntryMerchantByUsername_binarySearch = async (username: string) => {
    const q = `select * from entry_merchant where username LIKE BINARY ? limit 1`;

    const [entry_merchant] = await sequelize.query(q, {
      replacements: [username],
      type: QueryTypes.SELECT,
    });

    if (!entry_merchant) return null;

    return entry_merchant;
  };

  static findEntryMerchantById = async (id: number) => {
    const entry_merchant = await EntryMerchant.findByPk(id);

    if (!entry_merchant) throw new AppError(AppMessageModelNotFound("EntryMerchant"), 404);

    return entry_merchant.toJSON();
  };
}
