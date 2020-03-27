'use strict'

const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.host = require('./../src/app/models/host.js')(sequelize, Sequelize);
db.monitor = require('./../src/app/models/monitor.js')(sequelize, Sequelize);

//Relations
db.monitor.belongsTo(db.host);
db.host.hasMany(db.monitor);

module.exports = db;