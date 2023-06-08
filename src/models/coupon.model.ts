import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model
} from "sequelize";
import { sequelize } from ".";

class Coupon extends Model<InferAttributes<Coupon>, InferCreationAttributes<Coupon>> {
declare id: CreationOptional<number>;
declare name: string;
declare discount: number;
declare expiry: CreationOptional<Date>;
declare status: CreationOptional<boolean>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Coupon.init(
{
      id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
      },
      name: {
            type: DataTypes.STRING,
            allowNull: false,
            
      },
      discount: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
      },
      expiry: {
            type: DataTypes.DATE(6),
            allowNull: true,
            defaultValue: DataTypes.NOW,
      },
      status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
      sequelize: sequelize,
      modelName: "Coupon",
      tableName: "coupon",
      timestamps: true,
      paranoid: false,
}
);

export default Coupon;
