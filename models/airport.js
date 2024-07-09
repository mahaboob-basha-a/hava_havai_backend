const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const City = require('./city');
const Country = require('./country');

const Airport = sequelize.define('Airport', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  icao_code: DataTypes.STRING,
  iata_code: DataTypes.STRING,
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'id'
    }
  },
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id'
    }
  },
  continent_id: DataTypes.INTEGER,
  website_url: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  latitude_deg: DataTypes.FLOAT,
  longitude_deg: DataTypes.FLOAT,
  elevation_ft: DataTypes.FLOAT,
  wikipedia_link: DataTypes.STRING
}, {
  tableName: 'airport',
  timestamps: false
});

Airport.belongsTo(City, { foreignKey: 'city_id' });
Airport.belongsTo(Country, { foreignKey: 'country_id' });

module.exports = Airport;
