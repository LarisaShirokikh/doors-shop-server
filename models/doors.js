'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Doors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doors.init({
    doors_manufacturer: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vendor_code: DataTypes.STRING,
    name: DataTypes.STRING,
    configuration: DataTypes.STRING,
    description: DataTypes.STRING,
    images: DataTypes.STRING,
    in_stock: DataTypes.INTEGER,
    bestsellers: DataTypes.BOOLEAN,
    new: DataTypes.BOOLEAN,
    popularity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Doors',
  });
  return Doors;
};