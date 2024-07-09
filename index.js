const sequelize = require('./database');
const Airport = require('./models/airport');
const Country = require('./models/country');
const City = require('./models/city');

const xlsx = require('xlsx');
const path = require('path');

const filePath = path.resolve(__dirname, 'Database.xlsx');
const workbook = xlsx.readFile(filePath);

const airportSheet = xlsx.utils.sheet_to_json(workbook.Sheets['airport']);
const countrySheet = xlsx.utils.sheet_to_json(workbook.Sheets['country']);
const citySheet = xlsx.utils.sheet_to_json(workbook.Sheets['city']);

const airportData = airportSheet.map(row => ({
  id: row.id,
  icao_code: row.icao_code,
  iata_code: row.iata_code,
  name: row.name,
  type: row.type,
  city_id: row.city_id,
  country_id: row.country_id,
  continent_id: row.continent_id,
  website_url: row.website_url,
  created_at: row.created_at,
  updated_at: row.updated_at,
  latitude_deg: row.latitude_deg,
  longitude_deg: row.longitude_deg,
  elevation_ft: row.elevation_ft,
  wikipedia_link: row.wikipedia_link
}));

const countryData = countrySheet.map(row => ({
  id: row.id,
  name: row.name,
  alt_name: row.alt_name,
  country_code_two: row.country_code_two,
  country_code_three: row.country_code_three,
  flag_app: row.flag_app,
  mobile_code: row.mobile_code,
  continent_id: row.continent_id,
  country_flag: row.country_flag
}));

const cityData = citySheet.map(row => ({
  id: row.id,
  name: row.name,
  alt_name: row.alt_name,
  country_id: row.country_id,
  is_active: row.is_active,
  created_at: row.created_at,
  updated_at: row.updated_at,
  lat: row.lat,
  long: row.long
}));

async function main() {
  await sequelize.sync({ force: true }); // This creates the tables

  console.log('Inserting countries...');
  await Country.bulkCreate(countryData);
  console.log('Countries inserted.');

  console.log('Inserting cities...');
  await City.bulkCreate(cityData);
  console.log('Cities inserted.');

  console.log('Inserting airports...');
  await Airport.bulkCreate(airportData);
  console.log('Airports inserted.');

  console.log('Database synced and data inserted');
}

main().catch(error => console.log(error));
