import { object, string } from "yup";
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
      // .matches(/^[0-9]+$/, "Password must be only digits")
      .min(6, "Password must be exactly 6 digits")
      .max(9, "Password must be exactly 9 digits"),
    email: string().required(),
    phoneNo: string().required(),
    nrc_no: string().required()
        .min(18, "NRC Number must be exactly 18 digits")
        .max(18, "NRC Number must be exactly 18 digits"),
  }),
});

export const updateAdminSchema = object({
  ...adminId,
  body: object({
    username: string().required(),
    password: string()
      // .matches(/^[0-9]+$/, "Password must be only digits")
      .min(6, "Password must be exactly 6 digits")
      .max(9, "Password must be exactly 9 digits"),
    email: string().required(),
    phoneNo: string().required(),
    nrc_no: string().required()
        .min(18, "NRC Number must be exactly 18 digits")
        .max(18, "NRC Number must be exactly 18 digits"),
  }),
});

export const adminListFilterQuery = object({
  query: object({
    username: string(),
    email: string(),
    phoneNo: string(),
    nrc_no: string(),
    ...paginationPayload,
  }),
});

export const adminIdParam = object({ ...adminId });

export const singUpAdminSchema = object({
  body: object({
    username: string().required(),
    email: string().required(),
    phoneNo: string().required(),
    nrc_no: string().required(),
  }),
});


