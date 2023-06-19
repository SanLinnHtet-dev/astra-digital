import { Request, Response } from "express";
import handleError from "../../../utils/handleError";
import Permission from "../../../models/permission.model";
import successResponse from "../../../utils/successResponse";

export default class PermissionController {
  static findAllPermission = async (req: Request, res: Response) => {
    try {
      const permissions = await Permission.findAll();

      successResponse(res, null, permissions);
    } catch (error) {
      handleError(res, error);
    }
  };
}
