import { Op, QueryTypes } from "sequelize";
import EntryAdmin from "../../../models/entry_admin.model";
import AppError from "../../../utils/appError";
import { AppMessageModelNotFound } from "../../../constants/message.constant";
import { sequelize } from "../../../models";

export default class EntryAdminService {
  static findEntryByUsernameOrEmailOrPhoneNoOrNrc = async (
    username: string,
    email: string,
    phoneNo: string,
    nrc_no: string,
  ) => {
    const admin = await EntryAdmin.findOne({
      where: {
        [Op.or]: {
          username,
          email,
          phoneNo,
          nrc_no,
        },
      },
      raw: true,
    });

    if (!admin) return null;

    return admin;
  };

  static findEntryByUsername_binarySearch = async (username: string) => {
    const q = `select * from entry_admin where username LIKE BINARY ? limit 1`;

    const [entryAdmin] = await sequelize.query(q, {
      replacements: [username],
      type: QueryTypes.SELECT,
    });

    if (!entryAdmin) return null;

    return entryAdmin;
  };

  static findEntryAdminById = async (id: number) => {
    const entryAdmin = await EntryAdmin.findByPk(id, { raw: true });

    if (!entryAdmin) throw new AppError(AppMessageModelNotFound("EntryAdmin"), 404);

    return entryAdmin;
  };
}
