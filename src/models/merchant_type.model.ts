import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model,
} from "sequelize";
import { sequelize } from ".";

class MerchantType extends Model<
InferAttributes<MerchantType>,
InferCreationAttributes<MerchantType>
> {
declare id: CreationOptional<number>;
declare exclusive: string;
declare seller: string;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

MerchantType.init(
{
      id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      },
      exclusive: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "merchant_type",
      },
      seller: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "merchant_type",
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
      modelName: "MerchantType",
      tableName: "merchant_type",
      timestamps: true,
      paranoid: false,
}
);

export default MerchantType;
