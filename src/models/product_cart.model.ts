import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model
} from "sequelize";
import { sequelize } from ".";

class ProductCart extends Model<InferAttributes<ProductCart>, InferCreationAttributes<ProductCart>> {
declare id: CreationOptional<number>;
declare productID: number;
declare count: number;
declare price: number;
declare colorID: number;
declare status: CreationOptional<boolean>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

ProductCart.init(
{
      id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
      },
      productID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
            model: "product",
            key: "id",
            },
      },
      count: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
      },
      price: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
      },
      colorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
            model: "color",
            key: "id",
            },
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
      modelName: "ProductCart",
      tableName: "product_cart",
      timestamps: true,
      paranoid: false,
}
);

export default ProductCart;
