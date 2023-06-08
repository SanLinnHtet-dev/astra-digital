import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model,
} from "sequelize";
import { sequelize } from ".";
// import { TYPE } from "./types"

class Blog extends Model<
InferAttributes<Blog>,
InferCreationAttributes<Blog>
> {
declare id: CreationOptional<number>;
declare customerID: number;
declare merchantID: number;
declare adminID: number;
declare productOrderID: number;
declare like: number;
declare disLike: number;
declare desc: string;
declare title: string;
declare numView: number;
declare isLike: CreationOptional<Boolean>;
declare isDisLike: CreationOptional<Boolean>;
declare image: CreationOptional<string>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Blog.init(
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
      desc: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      image: {
            type: DataTypes.TEXT,
      },
      title: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      numView: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
      },
      isLike: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
      },
      isDisLike: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
      },
      like: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                  model: "customer",
                  key: "id"
            }
      },
      disLike: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                  model: "customer",
                  key: "id"
            }
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
      modelName: "Blog",
      tableName: "blog",
      timestamps: true,
      paranoid: false,
}
);




export default Blog;
