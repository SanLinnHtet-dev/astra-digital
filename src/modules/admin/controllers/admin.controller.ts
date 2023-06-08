import { Request, Response } from "express";
import successResponse from "../../../utils/successResponse";
import handleError from "../../../utils/handleError";
import { sequelize } from "../../../models";
import errorResponse from "../../../utils/errorResponse";
import AppMessage from "../../../constants/message.constant"
import AdminService from "../services/admin.service";
import AuthService from "../../auth/service/auth.service";
import Admin from "../../../models/admin.model";
import { get } from "lodash";
import { Op } from "sequelize";
import emptyValue from "../../../utils/emptyValue";
import isDuplicatedRecord from "../../../utils/isDuplicateRecord";
import alreadyExists from "../../../utils/alreadyExists";



export default class AdminController {

      /** Create Admin Account */
      static createAdmin = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {
            
            /** userme, password, email, phoneNo, nrc that will come from request body */

                  const { username, password, email, phoneNo, nrc } = req.body

            /** process auth to request data */

                  const findAdmin = await AdminService.findAdminByUsernameOrEmailOrPhoneNoOrNrc(
                        username,
                        email,
                        phoneNo,
                        nrc
                  )
                  if (findAdmin) return errorResponse(res, 403, AppMessage.alreadyExists);

            /** password encrypt */
                  const hashedPassword = await AuthService.encryptPassword(password);

            /** Admin account create */
                  const createdAdmin = await Admin.create({
                        ...req.body,
                        password: hashedPassword,
                      });

                  await transaction.commit();

                  successResponse(res, AppMessage.userCreated, createdAdmin);
            } catch (error) {
                  await transaction.rollback();
                  handleError(res, error);
            }
      }

      /** Update Admin Account */
      static updateAdminAccount = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {

            /**  */
                  const adminID = get(req.params, "adminID");

                  const { username, password, email, phoneNo, nrc_no  } = req.body;


                  const findAdminID = await AdminService.findAdminById(Number(adminID));
                  if(!findAdminID) return errorResponse(res, 404, AppMessage.badRequest)

                  const findAdmin = await Admin.findOne({
                        where: {
                              username: {
                                    [Op.like]: emptyValue(username as string),
                                  },
                                  email: {
                                    [Op.like]: emptyValue(email as string),
                                  },
                                  phoneNo: {
                                    [Op.like]: emptyValue(phoneNo as string),
                                  },
                                  nrc_no: {
                                    [Op.like]: emptyValue(nrc_no as string),
                                  },
                        }
                  })

                  if (isDuplicatedRecord(findAdmin, adminID)) return alreadyExists(res);

                  if (password) {
                        const hashedPassword = await AuthService.encryptPassword(password);
                        const updateCustomer = await Admin.update(
                          {
                            ...req.body,
                            password: hashedPassword,
                          },
                
                          { where: { id: adminID } }
                        );
                
                        
                        res.json(updateCustomer);
                      } else {
                
                      /** Customer updated */
                
                        await Admin.update({ ...req.body }, { where: { id: adminID } });
                      }

                  await transaction.commit();

                  successResponse(res, AppMessage.updated);
            } catch (error) {
                  await transaction.rollback();
                  handleError(res, error);
            }
      }

}