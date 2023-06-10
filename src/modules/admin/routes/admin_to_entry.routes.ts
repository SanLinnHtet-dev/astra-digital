import express from "express"
import AdminToEntryController from "../controllers/admin_to_entry.controller"
import validateRequest from "../../../middlewares/validate_request";
// import { paginationQuery } from "../../../utils/common.schema";
import {
      createEntryAdminSchema,
      updateEntryAdminSchema,
      entryAdminIdParam,
//   userListFilterQuery,
} from "../schemas/entry_admin.schema";
import admin_jwt from "../../../middlewares/admin_jwt";

const router = express.Router();

router.post(
  "/v1/admin/entry/create",
  [validateRequest(createEntryAdminSchema), admin_jwt],
  AdminToEntryController.createEntry
);


router.patch(
  "/v1/admin/entry/update/:entryAdminID",
  [validateRequest(updateEntryAdminSchema), admin_jwt],
  AdminToEntryController.updatEntryeAdminAccount
);

router.put(
      "/v1/admin/status_entry/:entryAdminID",
      [validateRequest(entryAdminIdParam), admin_jwt],
      AdminToEntryController.statusOnOffToggleEntry
);

router.delete(
  "/v1/admin/entry/delete/:entryAdminID",
  [validateRequest(entryAdminIdParam), admin_jwt],
  AdminToEntryController.deleteEntryAdmin
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
