import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";
import { sequelize } from ".";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>;
  declare roleName: string;
  declare uri: string;
  declare isChildRole: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Role.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    uri: {
      type: DataTypes.STRING,
      unique: "uniqueTag",
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING,
      unique: "uniqueTag",
      allowNull: false,
    },
    isChildRole: {
      // details page roles
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
    modelName: "Role",
    tableName: "role",
    timestamps: true,
    paranoid: false,
  }
);

export default Role;
