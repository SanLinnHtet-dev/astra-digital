import { ReqHandler } from "../../types";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import {
  TokenBasedRequest,
  TokenVerifyError,
  TokenVerifyPayload,
} from "../../types";
import errorResponse from "../utils/errorResponse";
import EntryMerchantService from "../modules/merchant/services/entry.service";
import AppMessage from "../constants/message.constant";

const entryMerchant_jwt: ReqHandler = (
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
    async (err: TokenVerifyError, entry_merchant: TokenVerifyPayload) => {
      if (err) return errorResponse(res, 400, err.message);

      entry_merchant = await EntryMerchantService.findEntryMerchantById(entry_merchant.id);

      req.entry_merchant = entry_merchant;
      next();
    }
  );

  // next();
};

export default entryMerchant_jwt;
