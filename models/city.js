const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Country = require('./country');

const City = sequelize.define('City', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: DataTypes.STRING,
  alt_name: DataTypes.STRING,
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id'
    }
  },
  is_active: DataTypes.BOOLEAN,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  lat: DataTypes.FLOAT,
  long: DataTypes.FLOAT
}, {
  tableName: 'city',
  timestamps: false
});

City.belongsTo(Country, { foreignKey: 'country_id' });

module.exports = City;
