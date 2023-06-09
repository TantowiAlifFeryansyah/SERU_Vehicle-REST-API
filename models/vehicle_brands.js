'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle_brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle_brands.hasMany(models.Vehicle_types, { foreignKey: 'brand_id'} )
    }
  }
  Vehicle_brands.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vehicle_brands',
  });
  return Vehicle_brands;
};