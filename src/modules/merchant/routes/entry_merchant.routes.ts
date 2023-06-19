import express from "express"
import EntryMerchantController from "../controller/merchant_to_entry.controller";
import validateRequest from "../../../middlewares/validate_request";
// import { paginationQuery } from "../../../utils/common.schema";
import {
      createEntryMerchantSchema,
      updateEntryMerchantSchema,
      entryMerchantIdParam,
//   userListFilterQuery,
} from "../schemas/entry_merchant.schema";

const router = express.Router();

router.post(
  "/v1/merchant/entry/create",
  [validateRequest(createEntryMerchantSchema)],
  EntryMerchantController.createEntryMerchant
);


router.put(
  "/v1/merchant/entry/update/:entryMerchantID",
  [validateRequest(updateEntryMerchantSchema)],
  EntryMerchantController.updatEntryeMerchantAccount
);

router.put(
      "/v1/merchant/status_entry/:entryMerchantID",
      [validateRequest(entryMerchantIdParam)],
      EntryMerchantController.statusOnOffToggleEntry
);

router.delete(
  "/v1/merchant/entry/delete/:entryMerchantID",
  [validateRequest(entryMerchantIdParam)],
  EntryMerchantController.deleteEntryMerchant
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
