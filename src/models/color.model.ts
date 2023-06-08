import {
      CreationOptional,
      DataTypes,
      InferAttributes,
      InferCreationAttributes,
      Model
    } from "sequelize";
    import { sequelize } from ".";
    
    class Color extends Model<InferAttributes<Color>, InferCreationAttributes<Color>> {
      declare id: CreationOptional<number>;
      declare color_type: string;
      declare status: CreationOptional<boolean>;
      declare createdAt: CreationOptional<Date>;
      declare updatedAt: CreationOptional<Date>;
    }
    
    Color.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        color_type: {
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
        modelName: "Color",
        tableName: "color",
        timestamps: true,
        paranoid: false,
      }
    );
    
    export default Color;
    