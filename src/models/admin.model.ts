import {
CreationOptional,
DataTypes,
InferAttributes,
InferCreationAttributes,
Model,
} from "sequelize";
import { sequelize } from ".";
import Role from "./role.model";

class Admin extends Model<
InferAttributes<Admin>,
InferCreationAttributes<Admin>
> {
declare id: CreationOptional<number>;
declare username: string;
declare password: string;
declare phoneNo: string;
declare email: string;
declare role_id: number;
declare image: string;
declare nrc_no: string;
declare confirmation_code: CreationOptional<string>;
declare status: CreationOptional<boolean>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Admin.init(
{
      id: {
      primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
      },
      username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "username",
      },
      password: {
            type: DataTypes.TEXT,
            allowNull: false,
      },
      role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
              model: "role",
              key: "id",
            },
          },
      phoneNo: {
            type: DataTypes.STRING,
            unique: "phoneNo",
            allowNull: false,
      },
      email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "email",
            validate: {
            isEmail: true,
            },
      },
      image: {
            type: DataTypes.STRING,
      },
      nrc_no: {
            type: DataTypes.STRING,
            unique: "nrc",
      },
      confirmation_code: {
            type: DataTypes.TEXT,
      },
      status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
      modelName: "Admin",
      tableName: "admin",
      timestamps: true,
      paranoid: false,
      indexes: [
            {
            name: "credentials",
            fields: ["username", "email"],
            },
      ],
}
);

/* Role - Staff */
Role.hasMany(Admin, {
      as: "users",
      foreignKey: "role_id",
});
    
Admin.belongsTo(Role, {
as: "role",
foreignKey: "role_id",
});


export default Admin;
