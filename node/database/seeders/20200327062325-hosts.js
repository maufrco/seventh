'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('hosts', [
        {
          name: "M4", 
          protocol: "http://", 
          domain: "www.m4dev.com.br", 
          path: ""
        },
        {
          name: "M4 404", 
          protocol: "http://", 
          domain: "www.m4dev.com.br", 
          path: "/404"
        },
        {
          name: "M4 301", 
          protocol: "http://", 
          domain: "www.m4dev.com.br", 
          path: "/301"
        },
        {
          name: "M4 501", 
          protocol: "http://", 
          domain: "www.m4dev.com.br", 
          path: "/501"
        },
        {
          name: "M4 Ping", 
          protocol: "http://", 
          domain: "www.m4dev.com.br", 
          path: "/ping"
        },
        {
          name: "M4 SSL", 
          protocol: "https://", 
          domain: "www.m4dev.com.br", 
          path: ""
        }
    ], {});
    
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('hosts', null, {});
  }
};
