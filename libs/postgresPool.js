const { Pool } = require('pg');
const { config } = require('./../config/config');

//encode uri es para protejer esta informacion
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//usualmente la ruta que nos da un servidor para conectar con la base de datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//connectionstring es un atributo que pool reconoce
const pool = new Pool({ connectionString: URI });

module.exports = pool;
