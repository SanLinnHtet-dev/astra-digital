import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from ".";
import { LOGIN_TYPE } from "./types";

class LoginAttempt extends Model<
  InferAttributes<LoginAttempt>,
  InferCreationAttributes<LoginAttempt>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare attempt: number;
  declare login_type: LOGIN_TYPE;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

LoginAttempt.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    attempt: {
      type: DataTypes.INTEGER,
    },
    login_type: {
      type: DataTypes.ENUM("ADMIN", "MERCHANT", "CUSTOMER"),
    },
    createdAt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "LoginAttempt",
    tableName: "login_attempt",
    timestamps: true,
    paranoid: false,
  }
);

export default LoginAttempt;
