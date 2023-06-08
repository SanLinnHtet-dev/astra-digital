import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model
} from "sequelize";
import { sequelize } from ".";

class Rating extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
declare id: CreationOptional<number>;
declare star: string;
declare comment: string;
declare postedBy_id: number;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Rating.init(
{
      id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
      },
      star: {
            type: DataTypes.STRING,
            unique: "uniqueTag",
            allowNull: false,
      },
      comment: {
            type: DataTypes.STRING,
            unique: "uniqueTag",
            allowNull: false,
      },
      postedBy_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                  model: "customer",
                  key: "id",
            },
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
      modelName: "Rating",
      tableName: "rating",
      timestamps: true,
      paranoid: false,
}
);

export default Rating;
