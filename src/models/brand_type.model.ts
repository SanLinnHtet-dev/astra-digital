import {
      CreationOptional,
      DataTypes,
      InferAttributes,
      InferCreationAttributes,
      Model
    } from "sequelize";
    import { sequelize } from ".";
    
    class BrandType extends Model<InferAttributes<BrandType>, InferCreationAttributes<BrandType>> {
      declare id: CreationOptional<number>;
      declare brand_name: string;
      declare status: CreationOptional<boolean>;
      declare createdAt: CreationOptional<Date>;
      declare updatedAt: CreationOptional<Date>;
    }
    
    BrandType.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        brand_name: {
          type: DataTypes.STRING,
          unique: "uniqueTag",
          allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
        modelName: "BrandType",
        tableName: "brand_type",
        timestamps: true,
        paranoid: false,
      }
    );
    
    export default BrandType;
    