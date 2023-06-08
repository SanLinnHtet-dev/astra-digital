import { Request, Response } from "express";
import { ReqHandler } from "../../types";
import errorResponse from "../utils/errorResponse";
import { AppMessageNotFound } from "../constants/message.constant";

const notFound: ReqHandler = (req: Request, res: Response) =>
  errorResponse(res, 404, AppMessageNotFound(req.originalUrl));

export default notFound;
