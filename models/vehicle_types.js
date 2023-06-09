'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle_types.hasMany(models.Vehicle_models, {foreignKey: 'type_id'})
      Vehicle_types.belongsTo(models.Vehicle_brands, {foreignKey: 'brand_id'})
    }
  }
  Vehicle_types.init({
    name: DataTypes.STRING,
    brand_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle_types',
  });
  return Vehicle_types;
};