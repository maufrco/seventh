'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('hosts', [
        {
          name: "Seventh", 
          protocol: "https://", 
          domain: "www.seventh.com.br", 
          path: ""
        },
        {
          name: "Google", 
          protocol: "https://", 
          domain: "www.google.com.br", 
          path: "/"
        },
        {
          name: "Microsoft", 
          protocol: "https://", 
          domain: "www.microsoft.com.br", 
          path: "/pt-br"
        },
        {
          name: "Amazon", 
          protocol: "https://", 
          domain: "www.amazon.com", 
          path: "/"
        },
        {
          name: "AWS", 
          protocol: "https://", 
          domain: "aws.amazon.com", 
          path: "/pt"
        },
        {
          name: "Azure", 
          protocol: "https://", 
          domain: "azure.microsoft.com", 
          path: "/pt-br"
        }
    ], {});
    
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('hosts', null, {});
  }
};
