import { Response } from "express";
import errorResponse from "./errorResponse";
import AppMessage from "../constants/message.constant";

const forbidden = (res: Response) =>
  errorResponse(res, 401, AppMessage.forbiddenAction);

export default forbidden;
