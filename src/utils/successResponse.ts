import { Response } from "express";
import cleanObj from "./cleanObj";
import AppMessage from "../constants/message.constant";

const successResponse = (
  res: Response,
  messages: string[] | null,
  data = {}
) => {
  res.status(200).json({
    ...{
      status: true,
      statusCode: 200,
    },
    ...{
      ...cleanObj({
        ...{
          messages: messages?.length
            ? messages
            : AppMessage.retrievedSuccessful,
          data,
        },
      }),
    },
  });
};

export default successResponse;
