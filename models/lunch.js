'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lunch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.lunch.belongsTo(models.user)
      models.lunch.hasMany(models.food)
      models.lunch.belongsTo(models.food)
    }
  };
  lunch.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lunch',
  });
  return lunch;
};