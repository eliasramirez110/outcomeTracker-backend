'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  jobs.init({
    jobtitle: DataTypes.STRING,
    jobdescription: DataTypes.STRING,
    companyname: DataTypes.STRING,
    salary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jobs',
  });
  return jobs;
};