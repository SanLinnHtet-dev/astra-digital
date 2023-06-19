import { Request, Response } from "express";
import successResponse from "../../../utils/successResponse";
import handleError from "../../../utils/handleError";
import { sequelize } from "../../../models";
import errorResponse from "../../../utils/errorResponse";
import AppMessage from "../../../constants/message.constant"
import AuthService from "../../auth/service/auth.service";
import EntryMerchant from "../../../models/entry_merchant.model";
import EntryMerchantService from "../services/entry.service";
import { get } from "lodash";
import { Op } from "sequelize";
import emptyValue from "../../../utils/emptyValue";
import isDuplicatedRecord from "../../../utils/isDuplicateRecord";
import alreadyExists from "../../../utils/alreadyExists";



export default class EntryMerchantController {

      /** Create Merchant Account */
      static createEntryMerchant = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {

                  const {  password, email, phoneNo, nrc_no } = req.body

                  const findMerchant = await EntryMerchantService.findEntryMerchantByEmailOrPhoneNoOrNrc(
                        email,
                        phoneNo,
                        nrc_no
                  )
                  if (findMerchant) return errorResponse(res, 403, AppMessage.alreadyExists);

            /** password encrypt */
                  const hashedPassword = await AuthService.encryptPassword(password);

            /** Merchant account create */
                  const createdMerchant = await EntryMerchant.create({
                        ...req.body,
                        password: hashedPassword,
                        });

                  await transaction.commit();

                  successResponse(res, AppMessage.merchantCreated, createdMerchant);
            } catch (error) {
                  await transaction.rollback();
                  handleError(res, error);
            }
      }

      /** Update Merchant Account */
      static updatEntryeMerchantAccount = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {

            const entryMerchantID = get(req.params, "entryMerchantID");

            const { password, email, phoneNo } = req.body;


            const findMerchantID = await EntryMerchantService.findEntryMerchantById(Number(entryMerchantID));
            if(!findMerchantID) return errorResponse(res, 404, AppMessage.badRequest)

            const findMerchant = await EntryMerchant.findOne({
                  where: {
                        email: {
                              [Op.like]: emptyValue(email as string),
                        },
                        phoneNo: {
                              [Op.like]: emptyValue(phoneNo as string),
                        },
                  }
            })

            if (isDuplicatedRecord(findMerchant, entryMerchantID)) return alreadyExists(res);

      /** If password, update password */
            if (password) {
                  const hashedPassword = await AuthService.encryptPassword(password);

                  /** update password */
                  const updatMerchant = await EntryMerchant.update(
                        {
                        ...req.body,
                        password: hashedPassword,
                        },
            
                        { where: { id: entryMerchantID } }
                  );
            
                  
                  res.json(updatMerchant);
                  } else {
            
                  /** Entry Merchant updated */
            
                  await EntryMerchant.update({ ...req.body }, { where: { id: entryMerchantID } });
                  }

            await transaction.commit();

                  successResponse(res, AppMessage.merchantUpdate);
            } catch (error) {
                  await transaction.rollback();
                  handleError(res, error);
            }
      }

      /** Delete Merchant account */
      static deleteEntryMerchant =async (req: Request, res: Response) => {
            try {
                  const entryMerchantID = get(req.params, "entryMerchantID");

                  await EntryMerchant.destroy({
                        where: {
                              id: entryMerchantID
                        }
                  })

                  successResponse(res, AppMessage.merchantDelete);
                  
            } catch (error) {
                  handleError(res, error);
            }
      }


      /*Status toggle On and Off Entry */
      static statusOnOffToggleEntry = async (req: Request, res: Response) => {
            try {
      
                  const entryMerchantID = get(req.params, "entryMerchantID");
            
                  const findEntry = await EntryMerchantService.findEntryMerchantById(Number(entryMerchantID));
                  if(!findEntry) return errorResponse(res, 404, AppMessage.invalidValue);
            
                  /**status condition jump and Customer status on update  */
            
                  if(findEntry?.status === true) {
                  return errorResponse(res, 400, AppMessage.statusOff)
                  }else {
                  await EntryMerchant.update(
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
                  await EntryMerchant.update(
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