import { Request, Response } from "express";
import errorResponse from "../../../utils/errorResponse";
import handleError from "../../../utils/handleError";
import Admin from "../../../models/admin.model";
import AuthService from "../service/auth.service";
import AdminService from '../../admin/services/admin.service'
import { omit } from "lodash";
import successResponse from "../../../utils/successResponse";
import AppMessage from "../../../constants/message.constant";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import LoginAttempt from "../../../models/login_attempt.model";
import { LOGIN_TYPE } from "../../../models/types";
import schedule from "node-schedule";
import moment from "moment";

export default class AdminAuthController {
  
  /*Admin Login */
  static admin_login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const admin = await AdminService.findAdminByUsername_binarySearch(username);

      if (!admin) return errorResponse(res, 403, AppMessage.invalidCredentials);

      const validatedUser = await AuthService.validateUser<Admin>(
        admin,
        password
      );

      if (!validatedUser) {
        // Login attempt failure
        const passwordFailure = await LoginAttempt.findOne({
          where: {
            username,
            login_type: LOGIN_TYPE.ADMIN,
          },
          raw: true,
        });

        if (passwordFailure) {
          if (passwordFailure.attempt < 5) {
            await LoginAttempt.update(
              {
                attempt: passwordFailure.attempt + 1,
              },
              {
                where: {
                  username,
                  login_type: LOGIN_TYPE.ADMIN,
                },
              }
            );

            if (passwordFailure.attempt === 4) {
              // delete schedule
              const targetDate = moment(new Date()).add(30, "m").toDate();
              schedule.scheduleJob(targetDate, async function () {
                await LoginAttempt.destroy({
                  where: {
                    username,
                    login_type: LOGIN_TYPE.ADMIN,
                  },
                });
              });
            }
          } else {
            return errorResponse(res, 403, AppMessage.cannotLogin);
          }
        } else {
          await LoginAttempt.create({
            username,
            login_type: LOGIN_TYPE.ADMIN,
            attempt: 1,
          });
        }

        return errorResponse(res, 403, AppMessage.invalidCredentials);
      } else {
        // destroy login attempt
        const passwordFailure = await LoginAttempt.findOne({
          where: {
            username,
            login_type: LOGIN_TYPE.ADMIN,
          },
          raw: true,
        });

        if (passwordFailure) {
          await LoginAttempt.destroy({
            where: {
              username,
              login_type: LOGIN_TYPE.ADMIN,
            },
          });
        }
      }

      const access_token = AuthService.generateAccessToken<Admin>(admin);

      if (!access_token)
        return errorResponse(res, 401, AppMessage.invalidCredentials);

      const secret = speakeasy.generateSecret({
        name: `ADMIN-` + uuidv4().substring(0, 7),
      });

      qrcode.toDataURL(
        secret.otpauth_url as string,
        async (err: any, data: any) => {
          if (err) throw err;

          let first_time = false;
          if (!admin.confirmation_code) {
            first_time = true;
          }

          return successResponse(res, AppMessage.validCredentials, {
            access_token,
            qr_codes: data,
            first_time,
            secret_code: admin.confirmation_code
              ? admin.confirmation_code
              : secret.base32,
            ...omit(admin, "password"),
          });
        }
      );
    } catch (error) {
      console.log(error);
      handleError(res, error);
    }
  };

  static admin_qrConfirm = async (req: Request, res: Response) => {
    try {
      const { username, code, secret_code } = req.body;

      const admin = await Admin.findOne({
        where: { username },
      });

      if (admin) {
        const verified = speakeasy.totp.verify({
          //secret: admin.confirmation_code,
          secret: req.body.secret_code,
          encoding: "base32",
          token: code,
        });

        const access_token = AuthService.generateAccessToken<Admin>(admin);

        if (verified) {
          await Admin.update(
            { confirmation_code: secret_code },
            { where: { id: admin.id } }
          );
          return successResponse(res, AppMessage.validCredentials, {
            access_token,
            ...omit(admin, "password"),
          });
        } else {
          return errorResponse(res, 401, AppMessage.codeDoesNotMatch);
        }
      } else {
        return errorResponse(res, 401, AppMessage.somethingWentWrong);
      }
    } catch (error) {
      handleError(res, error);
    }
  };
}
