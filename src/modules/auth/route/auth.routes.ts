import express from "express";
// import CustomerLoginRouter from '../controllers/customer_auth.controller'
// import AgentAuthController from "../controllers/agent_auth.controller";
import validateRequest from "../../../middlewares/validate_request";
import { credentialSchema, qrConfirmSchema } from "../schema/auth.schema";
import AdminAuthController from "../controller/admin_auth.controller";
import admin_jwt from "../../../middlewares/admin_jwt";

const router = express.Router();

// router.post(
//       "/v1/auth/customer_login",
//       [validateRequest(credentialSchema)],
//       CustomerLoginRouter.customer_login
// );

router.post(
      "/v1/auth/admin_login",
      [validateRequest(credentialSchema)],
      AdminAuthController.admin_login
);

router.post(
      "/v1/auth/admin_login/qr_confirm",
      [validateRequest(qrConfirmSchema), admin_jwt],
      AdminAuthController.admin_qrConfirm
);

// router.post(
//       "/v1/auth/agent_login",
//       [validateRequest(credentialSchema)],
//       AgentAuthController.agent_login
// );

export default router;
