const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Country = sequelize.define('Country', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  alt_name: DataTypes.STRING,
  country_code_two: DataTypes.STRING,
  country_code_three: DataTypes.STRING,
  flag_app: DataTypes.STRING,
  mobile_code: DataTypes.INTEGER,
  continent_id: DataTypes.INTEGER,
  country_flag: DataTypes.STRING
}, {
  tableName: 'country',
  timestamps: false
});

module.exports = Country;
