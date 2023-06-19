import { ReqHandler } from "./../../types.d";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import {
  TokenBasedRequest,
  TokenVerifyError,
  TokenVerifyPayload,
} from "../../types";
import errorResponse from "../utils/errorResponse";
import AppMessage from "../constants/message.constant";
import CustomerService from "../modules/customer/services/customer.service";

const customer_jwt: ReqHandler = (
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
    async (err: TokenVerifyError, customer: TokenVerifyPayload) => {
      if (err) return errorResponse(res, 400, err.message);

      if (customer.type !== "customer")
        return errorResponse(res, 403, AppMessage.unauthorized);

      customer = await CustomerService.findCustomerById(customer.id);

      req.customer = customer;
      next();
    }
  );

};

export default customer_jwt;
