import { ReqHandler } from "../../types";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import {
  TokenBasedRequest,
  TokenVerifyError,
  TokenVerifyPayload,
} from "../../types";
import errorResponse from "../utils/errorResponse";
import EntryAdminService from "../modules/admin/services/entry.service";
import AppMessage from "../constants/message.constant";

const entryAdmin_jwt: ReqHandler = (
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
    async (err: TokenVerifyError, entry_admin: TokenVerifyPayload) => {
      if (err) return errorResponse(res, 400, err.message);

      if (entry_admin.type !== "entry_admin") errorResponse(res, 403, AppMessage.unauthorized);


      entry_admin = await EntryAdminService.findEntryAdminById(entry_admin.id);

      req.entry_admin = entry_admin;
      next();
    }
  );

  // next();
};

export default entryAdmin_jwt;
