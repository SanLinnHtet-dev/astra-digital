import bcrypt from "bcryptjs";
// import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

// import crypto from 'crypto';
export default class AuthService {

  static encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(
      process.env.SALT ? +process.env.SALT : 10
    );

    return bcrypt.hashSync(password, salt);
  };

  static passwordCompare = async (text: string, encryptedText: string) => {
    return await bcrypt.compare(text, encryptedText);
  };

  // static generateOtp = () => {
  //   const otp = otpGenerator.generate(6, {
  //     lowerCaseAlphabets: false,
  //     upperCaseAlphabets: false,
  //     specialChars: false,
  //   });
  //   return otp;
  // };

  static validateUser = async <T extends { id: number; password: string }>(
    targetObj: T,
    password: string
  ) => {
    if (!targetObj || !bcrypt.compareSync(password, targetObj.password))
      return false;
    else return true;
  };

  static generateAccessToken = <T extends { id: number; password: string }>(
    targetObj: T
  ) => {
    const access_token = jwt.sign(
      { id: targetObj.id },
      process.env.ACCESS_TOKEN_SECRET || "Secret",
      {
        algorithm: "HS256",
        expiresIn: "24hr",
      }
    );

    return access_token;
  };
}
