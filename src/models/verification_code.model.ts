import {
      CreationOptional,
      DataTypes,
      InferAttributes,
      InferCreationAttributes,
      Model,
    } from "sequelize";
    import { sequelize } from ".";
    
    class VerificationCode extends Model<
      InferAttributes<VerificationCode>,
      InferCreationAttributes<VerificationCode>
    > {
      declare id: CreationOptional<number>;
      declare username: string;
      declare code: CreationOptional<string>;
      declare is_used: CreationOptional<boolean>;
      declare expired_at: CreationOptional<Date>;
      declare createdAt: CreationOptional<Date>;
      declare updatedAt: CreationOptional<Date>;
    }
    
    VerificationCode.init(
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
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        expired_at: {
            type: DataTypes.DATE(6),
            allowNull: true,
            defaultValue: DataTypes.NOW,
            validate: {
            isDate: true, 
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
        modelName: "VerificationCode",
        tableName: "verificationcode",
        timestamps: true,
        paranoid: false,
      }
    );
    
  
    
    export default VerificationCode;
    