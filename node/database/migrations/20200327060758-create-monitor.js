'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('monitors', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      monitorDate:{
        type: Sequelize.DATE,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statusCod: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      timeResponse:     {
        type: Sequelize.BIGINT},
     
    
  })},
  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('monitors');
  }
};
