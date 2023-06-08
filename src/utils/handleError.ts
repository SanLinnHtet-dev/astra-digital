import { Response } from "express";
import AppError from "./appError";

const handleError = (res: Response, error: any) => {
  if (error instanceof AppError) {
    res.status(500).json({
      status: false,
      statusCode: error.statusCode,
      messages: error.messages,
    });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      status: false,
      statusCode: 400,
      messages: "Already exists",
    });
  } else {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Something went wrong",
      errors: error,
    });
  }
};

export default handleError;
