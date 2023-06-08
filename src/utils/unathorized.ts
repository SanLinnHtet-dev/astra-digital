import { Response } from "express";
import errorResponse from "./errorResponse";
import AppMessage from "../constants/message.constant";

const unauthorized = (res: Response) =>
  errorResponse(res, 403, AppMessage.unauthorized);

export default unauthorized;
