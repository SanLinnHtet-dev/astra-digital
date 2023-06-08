import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model,
} from "sequelize";
import { sequelize } from ".";
import { TYPE } from "./types"

class Order extends Model<
InferAttributes<Order>,
InferCreationAttributes<Order>
> {
declare id: CreationOptional<number>;
declare customerID: number;
declare merchantID: number;
declare adminID: number;
declare productOrderID: number;
declare quantity: number;
declare amount: number;
declare payment_type: string;
declare expired_at: CreationOptional<Date>;
declare address_city: string;
declare address_township: string;
declare address_Qtr: string;
declare address_street: string;
declare address_No: string;
declare phoneNo: string;
declare image: string;
declare size: string;
declare type: TYPE;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Order.init(
{
      id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      },
      customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                  model: "customer",
                  key: "id"
            }
      },
      merchantID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                  model: "merchant",
                  key: "id"
            }
      },
      adminID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                  model: "admin",
                  key: "id"
            }
      },
      productOrderID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                  model: "product_order",
                  key: "id"
            }
      },
      quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
      },
      image: {
            type: DataTypes.STRING,
      },
      amount: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
      },
      payment_type: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      address_city: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      address_township: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      address_Qtr: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      address_street: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
      },
      address_No: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
      },
      expired_at: {
            type: DataTypes.DATE(6),
            allowNull: true,
            defaultValue: DataTypes.NOW,
      },
      size: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      type: {
            type: DataTypes.ENUM("MAN", "WOMEN", "CHILD"),
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
      modelName: "Order",
      tableName: "order",
      timestamps: true,
      paranoid: false,
}
);




export default Order;
