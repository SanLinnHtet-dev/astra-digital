import { Response } from "express";
import errorResponse from "./errorResponse";
import AppMessage from "../constants/message.constant";

const alreadyExists = (res: Response) =>
  errorResponse(res, 401, AppMessage.alreadyExists);

export default alreadyExists;
