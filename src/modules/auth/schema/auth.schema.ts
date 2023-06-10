import { object, string } from "yup";

export const credentialSchema = object({
  body: object({
    username: string().required(),
    password: string().required(),
  }),
});


export const qrConfirmSchema = object({
  body: object({
    username: string().required(),
    code: string().required(),
    secret_code: string().required()
  })
})