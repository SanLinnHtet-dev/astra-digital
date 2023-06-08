import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model,
} from "sequelize";
import { sequelize } from ".";
import { GENDER } from "./types";

class EntryMerchant extends Model<
InferAttributes<EntryMerchant>,
InferCreationAttributes<EntryMerchant>
> {
declare id: CreationOptional<number>;
declare username: string;
declare password: string;
declare phoneNo: string;
declare email: string;
declare image: string;
declare nrc_no: string;
declare nrc_front_photo: CreationOptional<string>;
declare nrc_back_photo: CreationOptional<string>;
declare dob: Date;
declare gender: GENDER;
declare status: CreationOptional<boolean>;
declare address_street: string;
declare address_township: string;
declare address_city: string;
declare address_country: string;
declare lat: string;
declare long: string;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

EntryMerchant.init(
{
      id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      },
      username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "username",
      },
      password: {
      type: DataTypes.TEXT,
      allowNull: false,
      },
      phoneNo: {
      type: DataTypes.STRING,
      unique: "phoneNo",
      allowNull: false,
      },
      email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
      validate: {
      isEmail: true,
      },
      },
      image: {
      type: DataTypes.STRING,
      },
      nrc_no: {
      type: DataTypes.STRING,
      unique: "nrc",
      },
      nrc_front_photo: {
      type: DataTypes.TEXT,
      },
      nrc_back_photo: {
      type: DataTypes.TEXT,
      },
      dob: {
      type: "TIMESTAMP",
      allowNull: false,
      },
      gender: {
      type: DataTypes.ENUM("MALE", "FEMALE"),
      allowNull: false,
      },
      address_street: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      address_township: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      address_city: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      address_country: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      },
      lat: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      long: {
      type: DataTypes.STRING,
      allowNull: false,
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
      modelName: "EntryMerchant",
      tableName: "entry_merchant",
      timestamps: true,
      paranoid: false,
}
);




export default EntryMerchant;
