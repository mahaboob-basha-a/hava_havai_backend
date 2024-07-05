const express = require('express')
const app = express()
const sqlite = require('sqlite')
const { Sequelize,DataTypes } = require('sequelize');
require('dotenv').config()

app.use(express.json())
const PORT = process.env.PORT || 4500
const sequelize = new Sequelize('sqlite::memory:')
const sequelizer = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
  });
const Airport = sequelize.define('Airport',{
    id:{type:DataTypes.INTEGER,primaryKey:true,unique:true},
    icao_code:DataTypes.STRING,
    iata_code:DataTypes.STRING,
    name:DataTypes.STRING,
    type:DataTypes.STRING,
    city_id:DataTypes.INTEGER,
    country_id:DataTypes.INTEGER,
    website_url:DataTypes.STRING,
    created_at:DataTypes.DATE,
    upadted_at:DataTypes.DATE,
    latitude_deg:DataTypes.INTEGER,
    elevation_ft:DataTypes.INTEGER,
    wikipedia_link:DataTypes.STRING
},{
    tableName:'Airport'
}) 
const data = {
    "airport": {
      "id": 145,
      "icao_code": "VIAG",
      "iata_code": "AGR",
      "name": "Agra Airport / Agra Air Force Station",
      "type": "medium_airport",
      "latitude_deg": 27.157683,
      "longitude_deg": 77.960942,
      "elevation_ft": 551,
      "address": {
        "city": {
          "id": 436,
          "name": "Agra",
          "country_id": 76,
          "is_active": true,
          "lat": 27.18,
          "long": 78.02
        },
        "country": {
          "id": 76,
          "name": "India",
          "country_code_two": "IN",
          "country_code_three": "IND",
          "mobile_code": 91,
          "continent_id": 1
        }
      }
    }
  }

  let connect = async()=>{
    try {
        await sequelize.authenticate();
        app.listen(PORT,()=> console.log("server running",PORT))
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  connect()
app.get('/',(req,res)=>{
    try {
        if(req.query === undefined){
            res.status(400).send('query should not empty')
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

