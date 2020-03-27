'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('monitors', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      hostId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'hosts',
          key: 'ID'}
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
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

    }
  })},
  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('monitors');
  }
};
