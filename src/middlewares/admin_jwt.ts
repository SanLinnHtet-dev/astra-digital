import { ReqHandler } from "./../../types.d";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import {
  TokenBasedRequest,
  TokenVerifyError,
  TokenVerifyPayload,
} from "../../types";
import errorResponse from "../utils/errorResponse";
import AdminService from "../modules/admin/services/admin.service";
import AppMessage from "../constants/message.constant";

const admin_jwt: ReqHandler = (
  req: TokenBasedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return errorResponse(res, 403, AppMessage.unauthorized);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: TokenVerifyError, admin: TokenVerifyPayload) => {
      if (err) return errorResponse(res, 400, err.message);

      admin = await AdminService.findAdminById(admin.id);

      req.admin = admin;
      next();
    }
  );

  // next();
};

export default admin_jwt;
