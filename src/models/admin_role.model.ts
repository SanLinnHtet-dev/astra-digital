import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from ".";
import Role from "./role.model";
import Admin from "./admin.model";

class Admin_Roles extends Model<
  InferAttributes<Admin_Roles>,
  InferCreationAttributes<Admin_Roles>
> {
  declare id: CreationOptional<number>;
  declare adminID: number;
  declare roleID: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Admin_Roles.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    adminID: {
      type: DataTypes.INTEGER,
      references: {
        model: "admin",
        key: "id",
      },
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "role",
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
    sequelize,
    modelName: "Admin_Roles",
    tableName: "admin_role",
    timestamps: true,
    paranoid: false,
  }
);

/* Role - Admin-Role */
Role.hasMany(Admin_Roles, {
  foreignKey: "roleID",
});

Admin_Roles.belongsTo(Role, {
  foreignKey: "roleID",
});

/* Admin - Admin role */
Admin.hasMany(Admin_Roles, {
  foreignKey: {
    name: "adminID",
    allowNull: true,
  },
});

Admin_Roles.belongsTo(Admin, {
  foreignKey: {
    name: "adminID",
    allowNull: true,
  },
});

export default Admin_Roles;
