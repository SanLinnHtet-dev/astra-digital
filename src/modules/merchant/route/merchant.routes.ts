import express from "express"
import MerchantController from "../controller/merchant.controller";
import validateRequest from "../../../middlewares/validate_request";
// import { paginationQuery } from "../../../utils/common.schema";
import {
  createMerchantSchema,
  updateMerchantSchema,
  merchantIdParam
//   userListFilterQuery,
} from "../schemas/merchant.schema";
import merchant_jwt from "../../../middlewares/merchant_jwt";

const router = express.Router();

router.post(
  "/v1/merchant/create",
  [validateRequest(createMerchantSchema)],
  MerchantController.createMerchant
);

// router.post(
//   "/v1/users/singup",
//   [validateRequest(singUpUserSchema)],
//   UserController.singUp
// );

router.patch(
  "/v1/merchant/update/:merchantID",
  [validateRequest(updateMerchantSchema), merchant_jwt],
  MerchantController.updateMerchantAccount
);

router.delete(
  "/v1/merchant/delete/:merchantID",
  [validateRequest(merchantIdParam)],
  MerchantController.deleteMerchant
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
