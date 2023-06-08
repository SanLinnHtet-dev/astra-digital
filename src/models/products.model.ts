import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model,
} from "sequelize";
import { sequelize } from ".";
import { TYPE } from "./types"

class Product extends Model<
InferAttributes<Product>,
InferCreationAttributes<Product>
> {
declare id: CreationOptional<number>;
declare title: string;
declare desc: string;
declare color_id: number;
declare image: CreationOptional<string>;
declare product_type_image: CreationOptional<string>;
declare quantity: number;
declare rating_id: number;
declare brand_id: number;
declare price: number;
declare slug: string;
declare category: string;
declare status: CreationOptional<boolean>;
declare sold: number;
declare total_rating: string;
declare product_type: string; // eg.skin, makeup, etc
declare name_type: string; // merchant name
declare size: number;
declare type: TYPE;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Product.init(
{
      id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
      },
      title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "title",
      },
      desc: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      color_id: {
            type: DataTypes.INTEGER,
            unique: "color",
            allowNull: false,
            primaryKey: true,
            references: {
            model: "color",
            key: "id",
            },
      },
      quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
      },
      image: {
            type: DataTypes.TEXT,
      },
      product_type_image: {
            type: DataTypes.TEXT,
      },
      rating_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
            model: "rating",
            key: "id",
            },
      },
      brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
            model: "brand_type",
            key: "id",
            },
      },
      price: {
            type: DataTypes.INTEGER,
            allowNull: false,
      },
      slug: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      category: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
      },
      sold: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      total_rating: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
      },
      product_type: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      name_type: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      size: {
            type: DataTypes.INTEGER,
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
      modelName: "Product",
      tableName: "product",
      timestamps: true,
      paranoid: false,
}
);




export default Product;
