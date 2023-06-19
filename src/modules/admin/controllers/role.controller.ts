import { Request, Response } from "express";
import AppMessage, {
  AppMessageModelNotFound,
} from "../../../constants/message.constant";
import Role from "../../../models/role.model";
import RolePermission from "../../../models/role_permission.model";
import handleError from "../../../utils/handleError";
import successResponse from "../../../utils/successResponse";
import { sequelize } from "../../../models";
import RoleService from "../services/role.service";
import { differenceWith, get, isEqual } from "lodash";
import isDuplicatedRecord from "../../../utils/isDuplicateRecord";
import alreadyExists from "../../../utils/alreadyExists";
import { IRoleWithUsers } from "../../../models/types";
import errorResponse from "../../../utils/errorResponse";
import { initAccessControl } from "../../../utils/access_control";

export default class RoleController {
  
  /* create role */
  static createRole = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const { roleName, permissions } = req.body;

      const createdRole = await Role.create(
        {
          roleName,
        },
        { transaction }
      );

      // create permissions
      await Promise.all(
        permissions.map(async (permission_id: number) => {
          await RolePermission.create(
            {
              role_id: createdRole.id,
              permission_id,
            },
            {
              transaction,
            }
          );
        })
      );

      await transaction.commit();
      // ReInitialize acl
      await initAccessControl();
      successResponse(res, AppMessage.created);
    } catch (error) {
      await transaction.rollback();
      handleError(res, error);
    }
  };

  /* update role */
  static updateRole = async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();

    try {
      const roleID = get(req.params, "roleID");

      const { roleName, permissions } = req.body;

      await RoleService.findRoleById(Number(roleID));

      const existingRole = await RoleService.findRoleByRoleName(roleName);

      if (isDuplicatedRecord(existingRole, roleID)) return alreadyExists(res);

      await Role.update(
        {
          roleName,
        },
        {
          where: {
            id: roleID,
          },
          transaction,
        }
      );

      if (permissions) {
        const rolePermissions = await RoleService.findRolePermissionByRoleId(
          Number(roleID)
        );

        const permission_ids: number[] = [];

        rolePermissions.forEach((rp) => permission_ids.push(rp.permission_id));

        const newPermissions: number[] = differenceWith(
          permissions,
          permission_ids,
          isEqual
        );

        const excludePermissions: number[] = differenceWith(
          permission_ids,
          permissions,
          isEqual
        );

        await Promise.all(
          newPermissions.map(async (permission_id) => {
            await RolePermission.create(
              {
                permission_id,
                role_id: Number(roleID),
              },
              { transaction }
            );
          })
        );

        await Promise.all(
          excludePermissions.map(async (permission_id) => {
            await RolePermission.destroy({
              where: {
                role_id: Number(roleID),
                permission_id,
              },
              transaction,
            });
          })
        );
      }

      await transaction.commit();
      // ReInitialize acl
      await initAccessControl();
      successResponse(res, AppMessage.updated);
    } catch (error) {
      await transaction.rollback();

      handleError(res, error);
    }
  };

  /* delete role */
  static deleteRole = async (req: Request, res: Response) => {
    try {
      const roleID = get(req.params, "roleID");

      const role = await RoleService.findRoleById(Number(roleID));
      console.log(role, "Role Data")

      if ((role as IRoleWithUsers).admins.length) {
        return errorResponse(res, 403, AppMessage.forbiddenAction);
      }

      await RolePermission.destroy({
        where: {
          role_id: roleID,
        },
      });

      await Role.destroy({
        where: {
          id: roleID,
        },
      });

      // ReInitialize acl
      await initAccessControl();
      successResponse(res, AppMessage.deleted);
    } catch (error) {
      handleError(res, error);
    }
  };

  /* find all roles */
  static findAllRoles = async (req: Request, res: Response) => {
    try {
      const roles = await RoleService.findAllRoles();

      successResponse(res, null, roles);
    } catch (error) {
      handleError(res, error);
    }
  };

  /* find role by id */
  static findRoleById = async (req: Request, res: Response) => {
    try {
      const roleID = get(req.params, "roleID");

      const role = await RoleService.findRoleWith_permissions_user_count(
        Number(roleID)
      );

      if (!role) return AppMessageModelNotFound("Role");

      return successResponse(res, null, role);
    } catch (error) {
      handleError(res, error);
    }
  };

}
