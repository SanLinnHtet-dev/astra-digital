import { ReqHandler } from "../../types";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import {
  TokenBasedRequest,
  TokenVerifyError,
  TokenVerifyPayload,
} from "../../types";
import errorResponse from "../utils/errorResponse";
import MerchantService from "../modules/merchant/services/merchant.service";
import AppMessage from "../constants/message.constant";

const merchant_jwt: ReqHandler = (
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
    async (err: TokenVerifyError, merchant: TokenVerifyPayload) => {
      if (err) return errorResponse(res, 400, err.message);

      merchant = await MerchantService.findMerchantById(merchant.id);

      req.merchant = merchant;
      next();
    }
  );

  // next();
};

export default merchant_jwt;
