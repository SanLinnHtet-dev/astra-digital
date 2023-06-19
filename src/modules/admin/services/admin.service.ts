import { Op, QueryTypes } from "sequelize";
import Admin from "../../../models/admin.model";
import AppError from "../../../utils/appError";
import { AppMessageModelNotFound } from "../../../constants/message.constant";
import { sequelize } from "../../../models";
import Role from "../../../models/role.model";

export default class AdminService {
  static findAdminByUsernameOrEmailOrPhoneNoOrNrc = async (
    username: string,
    email: string,
    phoneNo: string,
    nrc_no: string,
  ) => {
    const admin = await Admin.findOne({
      where: {
        [Op.or]: {
          username,
          email,
          phoneNo,
          nrc_no,
        },
      },
    });

    if (!admin) return null;

    return admin.toJSON();
  };

  static findAdminByUsername_binarySearch = async (username: string) => {
    const q = `select * from admin where username LIKE BINARY ? limit 1`;

    const [admin] = await sequelize.query(q, {
      replacements: [username],
      type: QueryTypes.SELECT,
    });

    if (!admin) return null;

    return admin;
  };

  static findAdminById = async (id: number) => {
    const admin = await Admin.findByPk(id, {
      include: [{ model: Role, as: "role" }]
    });

    if (!admin) throw new AppError(AppMessageModelNotFound("Admin"), 404);

    return admin.toJSON();
  };
}
