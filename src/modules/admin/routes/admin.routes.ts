import express from "express"
import AdminController from "../controllers/admin.controller";
import validateRequest from "../../../middlewares/validate_request";
// import { paginationQuery } from "../../../utils/common.schema";
import {
  createAdminSchema,
  updateAdminSchema,
  adminIdParam,
//   userListFilterQuery,
} from "../schemas/admin.schema";

const router = express.Router();

router.post(
  "/v1/admin/create",
  [validateRequest(createAdminSchema)],
  AdminController.createAdmin
);

// router.post(
//   "/v1/users/singup",
//   [validateRequest(singUpUserSchema)],
//   UserController.singUp
// );

router.patch(
  "/v1/users/update/:adminID",
  [validateRequest(updateAdminSchema)],
  AdminController.updateAdminAccount
);

router.delete(
  "/v1/users/delete/:adminID",
  [validateRequest(adminIdParam)],
  AdminController.deleteAdmin
);

// router.get(
//   "/v1/users/user_roles_by_user_id/:userID",
//   [validateRequest(userIdParam)],
//   UserController.userRoles
// );

// router.get(
//   "/v1/users/list",
//   [validateRequest(paginationQuery)],
//   UserController.userList
// );

// router.get(
//   "/v1/users/list_filter",
//   [validateRequest(userListFilterQuery)],
//   UserController.userListFilter
// );

// router.get(
//   "/v1/users/by_id/:userID",
//   [validateRequest(userIdParam)],
//   UserController.getUserById
// );

// router.get(
//   "/v1/users/roles_list",
//   UserController.roleList
// );

export default router;
