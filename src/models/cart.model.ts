import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model
} from "sequelize";
import { sequelize } from ".";
import { ORDER_STATUS } from "./types"

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
declare id: CreationOptional<number>;
declare cart_total: number;
declare totalAfter_discount: number;
declare orderStatus: ORDER_STATUS;
declare products_cartID: number;
declare customerID: number;
declare status: CreationOptional<boolean>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Cart.init(
{
      id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
      },
      cart_total: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
      },
      totalAfter_discount: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
      },
      orderStatus: {
            type: DataTypes.ENUM("Not Prosessed", "Cash on Delivery", "Prosessing", "Dispatched", "Canceld", "Delivered"),
            allowNull: false,
      },
      products_cartID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
            model: "product_cart",
            key: "id",
            },
      },
      customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
            model: "customer",
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
      modelName: "Cart",
      tableName: "cart",
      timestamps: true,
      paranoid: false,
}
);

export default Cart;
