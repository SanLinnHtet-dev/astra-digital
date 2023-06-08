import {
      CreationOptional,
      DataTypes,
      InferAttributes,
      InferCreationAttributes,
      Model,
    } from "sequelize";
    import { sequelize } from ".";
    
    class PasswordReset extends Model<
      InferAttributes<PasswordReset>,
      InferCreationAttributes<PasswordReset>
    > {
      declare id: CreationOptional<number>;
      declare username: string;
      declare token: CreationOptional<string>;
      declare createdAt: CreationOptional<Date>;
      declare updatedAt: CreationOptional<Date>;
    }
    
    PasswordReset.init(
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
        token: {
            type: DataTypes.STRING,
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
        modelName: "PasswordReset",
        tableName: "password_reset",
        timestamps: true,
        paranoid: false,
      }
    );
    
  
    
    export default PasswordReset;
    