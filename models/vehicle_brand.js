'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle_brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicle_brand.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vehicle_brand',
  });
  return Vehicle_brand;
};