import AccessControl from "acl";
import Permission from "../models/permission.model";
import Role from "../models/role.model";
import { IRoleWithPermissions } from "../models/types";

const ac = new AccessControl(new AccessControl.memoryBackend());

const initAccessControl = async () => {
  const roles = await Role.findAll({
    include: {
      model: Permission,
      through: { attributes: [] },
      as: "permissions",
    },
  });

  roles.forEach((role) => {
    (role.dataValues as IRoleWithPermissions).permissions.forEach(
      async (permission: Permission) => {
        ac.allow(role.roleName, permission.group, permission.action);
      }
    );
  });
};

//initAccessControl();

export { ac, initAccessControl };
