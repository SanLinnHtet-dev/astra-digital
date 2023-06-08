import {
      CreationOptional,
      DataTypes,
      InferAttributes,
      InferCreationAttributes,
      Model
    } from "sequelize";
    import { sequelize } from ".";
    
    class ProductOrder extends Model<InferAttributes<ProductOrder>, InferCreationAttributes<ProductOrder>> {
      declare id: CreationOptional<number>;
      declare productID: number;
      declare count: number;
      declare color: string;
      declare createdAt: CreationOptional<Date>;
      declare updatedAt: CreationOptional<Date>;
    }
    
    ProductOrder.init(
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
            model: "product_order",
            key: "id",
          }
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING,
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
        modelName: "ProductOrder",
        tableName: "product_order",
        timestamps: true,
        paranoid: false,
      }
    );
    
    export default ProductOrder;
    