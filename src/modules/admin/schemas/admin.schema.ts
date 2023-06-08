import {array, object, string } from "yup";
import { paginationPayload } from "../../../utils/common.schema";

const adminId = {
  params: object({
    adminID: string().required(),
  }),
};

export const createAdminSchema = object({
  body: object({
    username: string().required(),
    password: string()
      .required()
      .matches(/^[0-9]+$/, "Password must be only digits")
      .min(6, "Password must be exactly 5 digits")
      .max(6, "Password must be exactly 5 digits"),
    email: string().required(),
    phoneNo: string().required(),
    roles: array().required().min(1),
    nrc: string().required()
        .matches(/^(0-9)+$/, "Password must be only digits")
        .min(18, "Password must be exactly 18 digits")
        .max(18, "Password must be exactly 18 digits"),
  }),
});

export const updateAdminSchema = object({
  ...adminId,
  body: object({
    username: string().required(),
    password: string()
      .matches(/^[0-9]+$/, "Password must be only digits")
      .min(6, "Password must be exactly 5 digits")
      .max(6, "Password must be exactly 5 digits"),
    email: string().required(),
    phoneNo: string().required(),
    roles: array(),
    nrc: string().required()
        .min(18, "Password must be exactly 18 digits")
        .max(18, "Password must be exactly 18 digits"),
  }),
});

export const adminListFilterQuery = object({
  query: object({
    username: string(),
    email: string(),
    phoneNo: string(),
    nrc: string(),
    ...paginationPayload,
  }),
});

export const adminIdParam = object({ ...adminId });

export const singUpAdminSchema = object({
  body: object({
    username: string().required(),
    email: string().required(),
    phoneNo: string().required(),
    nrc: string().required(),
  }),
});


