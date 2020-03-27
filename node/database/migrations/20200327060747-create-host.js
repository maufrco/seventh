'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('hosts', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
      },
      protocol: {
        type: Sequelize.STRING,
        allowNull: false
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }); 
},
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('hosts');
  }
};
