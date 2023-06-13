import { Request, Response } from "express";
import successResponse from "../../../utils/successResponse";
import handleError from "../../../utils/handleError";
import { sequelize } from "../../../models";
import errorResponse from "../../../utils/errorResponse";
import AppMessage from "../../../constants/message.constant"
import AuthService from "../../auth/service/auth.service";
import Merchant from "../../../models/merchant.model";
import MerchantService from "../services/merchant.service";
import { get } from "lodash";
import { Op } from "sequelize";
import emptyValue from "../../../utils/emptyValue";
import isDuplicatedRecord from "../../../utils/isDuplicateRecord";
import alreadyExists from "../../../utils/alreadyExists";



export default class MerchantController {

      /** Create Merchant Account */
      static createMerchant = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {

                  const { username, password, email, phoneNo, nrc } = req.body

                  const findMerchant = await MerchantService.findMerchantByUsernameOrEmailOrPhoneNoOrNrc(
                        username,
                        email,
                        phoneNo,
                        nrc
                  )
                  if (findMerchant) return errorResponse(res, 403, AppMessage.alreadyExists);

            /** password encrypt */
                  const hashedPassword = await AuthService.encryptPassword(password);

            /** Merchant account create */
                  const createdMerchant = await Merchant.create({
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
      static updateMerchantAccount = async (req: Request, res: Response) => {
            const transaction = await sequelize.transaction();

            try {

            const merchantID = get(req.params, "merchantID");

            const { username, password, email, phoneNo } = req.body;


            const findMerchantID = await MerchantService.findMerchantById(Number(merchantID));
            if(!findMerchantID) return errorResponse(res, 404, AppMessage.badRequest)

            const findMerchant = await Merchant.findOne({
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
                  }
            })

            if (isDuplicatedRecord(findMerchant, merchantID)) return alreadyExists(res);

      /** If password, update password */
            if (password) {
                  const hashedPassword = await AuthService.encryptPassword(password);

                  /** update password */
                  const updatMerchant = await Merchant.update(
                        {
                        ...req.body,
                        password: hashedPassword,
                        },
            
                        { where: { id: merchantID } }
                  );
            
                  
                  res.json(updatMerchant);
                  } else {
            
                  /** Customer updated */
            
                  await Merchant.update({ ...req.body }, { where: { id: merchantID } });
                  }

            await transaction.commit();

                  successResponse(res, AppMessage.merchantUpdate);
            } catch (error) {
                  await transaction.rollback();
                  handleError(res, error);
            }
      }

      /** Delete Merchant account */
      static deleteMerchant =async (req: Request, res: Response) => {
            try {
                  const merchantID = get(req.params, "merchantID");

                  await Merchant.destroy({
                        where: {
                              id: merchantID
                        }
                  })

                  successResponse(res, AppMessage.merchantDelete);
                  
            } catch (error) {
                  handleError(res, error);
            }
      }

}