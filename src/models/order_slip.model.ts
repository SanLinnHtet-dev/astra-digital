import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model
} from "sequelize";
import { sequelize } from ".";

class OrderSlip extends Model<InferAttributes<OrderSlip>, InferCreationAttributes<OrderSlip>> {
declare id: CreationOptional<number>;
declare customerID: number;
declare merchantID: number;
declare adminID: number;
declare customerOrderID: number;
declare total_amount: number;
declare note: string;
declare image: string;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

OrderSlip.init(
{
      id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      },
      customerID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                  model: "customer",
                  key: 'id',
            }
      },
      merchantID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                  model: "customer",
                  key: 'id',
            }
      },
      adminID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                  model: "customer",
                  key: 'id',
            }
      },
      customerOrderID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                  model: "order",
                  key: 'id',
            }
      },
      total_amount: {
            type: DataTypes.DECIMAL(65, 3),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
      },
      note: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      image: {
            type: DataTypes.STRING,
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
      modelName: "OrderSlip",
      tableName: "order_slip",
      timestamps: true,
      paranoid: false,
}
);

export default OrderSlip;
