const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

//const USER = encodeURIComponent(config.dbUser);
//const PASSWORD = encodeURIComponent(config.dbPassword);
//const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: 'postgres',
  logging: 'production' ? false : true,
};

if ('production') {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

//en dialect le pasamos a que tipo de base de daytos nos vamos a conectar
const sequelize = new Sequelize(
  'postgres://juan:admin123@localhost:5432/my_store',
  options
);

setupModels(sequelize);

//sequelize.sync();
module.exports = sequelize;
