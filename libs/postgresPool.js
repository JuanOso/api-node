const { Pool } = require('pg');
const { config } = require('./../config/config');

let URI = '';

if (config.isProd) {
  URI = config.dbUrl;
} else {
  //encode uri es para protejer esta informacion
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  //usualmente la ruta que nos da un servidor para conectar con la base de datos
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}
//connectionstring es un atributo que pool reconoce
const pool = new Pool({ connectionString: URI });

module.exports = pool;
