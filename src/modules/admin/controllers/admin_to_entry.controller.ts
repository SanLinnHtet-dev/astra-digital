import { Request, Response } from "express";
import successResponse from "../../../utils/successResponse";
import handleError from "../../../utils/handleError";
import { sequelize } from "../../../models";
import errorResponse from "../../../utils/errorResponse";
import AppMessage from "../../../constants/message.constant"
import AuthService from "../../auth/service/auth.service";
import { get } from "lodash";
import { Op } from "sequelize";
import emptyValue from "../../../utils/emptyValue";
import isDuplicatedRecord from "../../../utils/isDuplicateRecord";
import alreadyExists from "../../../utils/alreadyExists";
import EntryAdmin from '../../../models/entry_admin.model';
import EntryAdminService from "../services/entry.service";



export default class AdminToEntryController {

      /** Admin Create to entry Account */
      static createEntry = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {
            
            /** userme, password, email, phoneNo, nrc that will come from request body */

                  const { username, password, email, phoneNo, nrc_no } = req.body

                  const findAdmin = await EntryAdminService.findEntryByUsernameOrEmailOrPhoneNoOrNrc(
                        username,
                        email,
                        phoneNo,
                        nrc_no
                  )
                  if (findAdmin) return errorResponse(res, 403, AppMessage.alreadyExists);

            /** password encrypt */
                  const hashedPassword = await AuthService.encryptPassword(password);

            /** Admin account create */
                  const createdEntry = await EntryAdmin.create({
                        ...req.body,
                        password: hashedPassword,
                        });

                  await transaction.commit();

                  successResponse(res, AppMessage.adminCreated, createdEntry);
            } catch (error) {
                  await transaction.rollback();
                  handleError(res, error);
            }
      }

      /** Admin Update to entry Account */
      static updatEntryeAdminAccount = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {

            const entryAdminID = get(req.params, "entryAdminID");

            const { username, password, email, phoneNo, nrc_no  } = req.body;


            const findAdminID = await EntryAdminService.findEntryAdminById(Number(entryAdminID));
            if(!findAdminID) return errorResponse(res, 404, AppMessage.badRequest)

            const findAdmin = await EntryAdmin.findOne({
                  where: {
                        [Op.or]: [
                              {
                                    username: {
                                          [Op.like]: emptyValue(username as string),
                                    },
                              },
                              {
                                    email: {
                                          [Op.like]: emptyValue(email as string),
                                    },
                              },
                              {
                                    phoneNo: {
                                          [Op.like]: emptyValue(phoneNo as string),
                                    },
                              },
                              {
                                    nrc_no: {
                                          [Op.like]: emptyValue(nrc_no as string),
                                    },

                              }
                        ]
                  }
            })

            if (isDuplicatedRecord(findAdmin, entryAdminID)) return alreadyExists(res);

      /** If password, update password */
            if (password) {
                  const hashedPassword = await AuthService.encryptPassword(password);

                  /** update password */
                  const updateCustomer = await EntryAdmin.update(
                        {
                        ...req.body,
                        password: hashedPassword,
                        },
            
                        { where: { id: entryAdminID } }
                  );
            
                  
                  res.json(updateCustomer);
                  } else {
            
                  /** Customer updated */
            
                  await EntryAdmin.update({ ...req.body }, { where: { id: entryAdminID } });
                  }

                  await transaction.commit();

                  successResponse(res, AppMessage.updated);
            } catch (error) {
                  await transaction.rollback();
                  handleError(res, error);
            }
      }

      /** Admin Delete to entry account */
      static deleteEntryAdmin =async (req: Request, res: Response) => {
            try {

                  const entryAdminID = get(req.params, "entryAdminID");

                  const findEntryId = await EntryAdminService.findEntryAdminById(Number(entryAdminID));
                  if(!findEntryId) return errorResponse(res, 404, AppMessage.badRequest)

                  await EntryAdmin.destroy({
                        where: {
                              id: entryAdminID
                        }
                  })

                  successResponse(res, AppMessage.adminDelete);
                  
            } catch (error) {
                  handleError(res, error);
            }
      }

      /*Status toggle On and Off Entry */
      static statusOnOffToggleEntry = async (req: Request, res: Response) => {
            try {
      
                  const entryAdminID = get(req.params, "entryAdminID");
      
            const findEntry = await EntryAdminService.findEntryAdminById(Number(entryAdminID));
            if(!findEntry) return errorResponse(res, 404, AppMessage.invalidValue);
      
            /**status condition jump and Customer status on update  */
      
            if(findEntry?.status === true) {
            return errorResponse(res, 400, AppMessage.statusOff)
            }else {
            await EntryAdmin.update(
                  {
                  ...req.body,
                  status: !findEntry.status,
                  },
                  {
                  where: {
                  id: findEntry.id
                  }
                  }
            )
            successResponse(res, AppMessage.statusOn);
      
            }
      
            /**status condition jump and Customer status off update  */
      
            if(findEntry?.status === false) {
            return errorResponse(res, 400, AppMessage.statusOn)
            }else {
            await EntryAdmin.update(
                  {
                  ...req.body,
                  status: !findEntry?.status,
                  },
                  {
                  where: {
                  id: findEntry.id
                  }
                  }
            )
            successResponse(res, AppMessage.statusOff);
            }
      
      
            } catch (error) {
            handleError(res, error);
            }
      }

}