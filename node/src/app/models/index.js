'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../../../config/database.js');
const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.hostModel = require('./host.js')(sequelize, Sequelize);
db.monitorModel = require('./monitor.js')(sequelize, Sequelize);

// db.sync({force:true}).success(function(){
//   console.log("ok")
// })

db.hostModel.hasMany(db.monitorModel, {foreignKey: 'hostID', as: 'results',onDelete: 'CASCADE'});
db.monitorModel.belongsTo(db.hostModel, {foreignKey: 'hostID', as: 'host',onDelete: 'CASCADE'});

module.exports = db;  

