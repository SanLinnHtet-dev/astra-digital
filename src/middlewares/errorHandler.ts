import { Request, Response } from "express";
import { ReqHandler, ResponseError } from "../../types";
import cleanObj from "../utils/cleanObj";

const errorHandler: ReqHandler = (
  err: ResponseError,
  req: Request,
  res: Response
) => {
  return res.status(err.statusCode).json({
    ...{
      status: false,
      statusCode: err.statusCode,
    },
    ...{
      ...cleanObj({
        ...{
          messages: err?.message as unknown as string[],
          stack: err?.stack,
          errors: err,
        },
      }),
    },
  });
};

export default errorHandler;
