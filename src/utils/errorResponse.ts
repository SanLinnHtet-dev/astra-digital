import { Response } from "express";
import cleanObj from "./cleanObj";
import AppMessage from "../constants/message.constant";

const errorResponse = (
  res: Response,
  statusCode = 500,
  messages: string[],
  errors = {}
) => {
  res.status(statusCode).json({
    ...{
      status: false,
      statusCode,
    },
    ...{
      ...cleanObj({
        ...{
          messages: messages.length ? messages : AppMessage.somethingWentWrong,
          errors,
        },
      }),
    },
  });
};

export default errorResponse;
