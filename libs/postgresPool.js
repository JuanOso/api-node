const { Pool } = require('pg');
const { config } = require('./../config/config');

const options = {};
if (config.isProd) {
  options.connectionString = 'postgres://juan:admin123@localhost:5432/my_store';
  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  //encode uri es para protejer esta informacion
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  //usualmente la ruta que nos da un servidor para conectar con la base de datos
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

//connectionstring es un atributo que pool reconoce
const pool = new Pool(options);

module.exports = pool;
