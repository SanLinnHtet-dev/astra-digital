import { NextFunction, Request, Response } from "express";
import RoleService from "../modules/admin/services/role.service";
import unauthorized from "../utils/unathorized";
import { ac } from "../utils/access_control";
import forbidden from "../utils/forbidden";
// import Role from "../models/role.model";

const hasPermission = ({
  action,
  targetResource,
}: {
  action: string;
  targetResource: string;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.admin;

    if (!admin) return unauthorized(res);

    const role = await RoleService.findRoleById(admin.role_id); 

    const permission = await ac.areAnyRolesAllowed(
      role.dataValues.roleName,
      targetResource,
      action
    );

    if (permission) next();
    else forbidden(res);
  };
};

export default hasPermission;
