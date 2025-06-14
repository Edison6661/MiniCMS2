const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite', // або './data/database.sqlite'
  logging: false
});

module.exports = sequelize;