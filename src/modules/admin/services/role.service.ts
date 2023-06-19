import { AppMessageModelNotFound } from "../../../constants/message.constant";
import { sequelize } from "../../../models";
import Permission from "../../../models/permission.model";
import Role from "../../../models/role.model";
import RolePermission from "../../../models/role_permission.model";
import Admin from "../../../models/admin.model";
import AppError from "../../../utils/appError";

export default class RoleService {
  static findRoleById = async (id: number) => {
    const role = await Role.findByPk(id, {
      include: {
        model: Admin,
        as: "admin",
      },
    });

    if (!role) throw new AppError(AppMessageModelNotFound("Role"), 404);

    return role.toJSON();
  };

  static findRoleByRoleName = async (roleName: string) => {
    const role = await Role.findOne({
      where: {
        roleName,
      },
    });

    if (!role) return null;
    return role.toJSON();
  };

  static findRolePermissionByRoleId = async (role_id: number) => {
    return await RolePermission.findAll({
      where: {
        role_id,
      },
    });
  };

  static findAllRoles = async () => {
    return await Role.findAll({
      include: {
        model: Permission,
        through: { attributes: [] },
        as: "permissions",
      },
      attributes: [
        "id",
        "roleName",
        [
          sequelize.literal(
            "(SELECT COUNT(DISTINCT `admin`.`id`) FROM `admin` WHERE `admin`.`role_id` = `Role`.`id`)"
          ),
          "adminCount",
        ],
      ],
    });
  };

  static findRoleWith_permissions_user_count = async (role_id: number) => {
    return await Role.findByPk(role_id, {
      include: {
        model: Permission,
        through: { attributes: [] },
        as: "permissions",
      },
      attributes: [
        "id",
        "roleName",
        [
          sequelize.literal(
            "(SELECT COUNT(DISTINCT `admin`.`id`) FROM `admin` WHERE `admin`.`role_id` = `Role`.`id`)"
          ),
          "adminCount",
        ],
      ],
    });
  };
}
