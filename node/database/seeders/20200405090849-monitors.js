'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Monitors', [
      {
        hostID:2, 
        monitorDate:"2020-03-31 23:54:15",
        url:"https://www.seventh.com.br/", 
        statusCod: 200, 
        status:'200 OK',
        timeResponse:526
        
      },{
      hostID:3, 
      monitorDate:"2020-03-31 23:54:15",
      url:"https://www.seventh.com.br/", 
      statusCod: 200, 
      status:"200 OK",
      timeResponse:526
      
    },{

    hostID:4, 
    monitorDate:"2020-03-31 23:54:15",
    url:"https://www.seventh.com.br/", 
    statusCod: 200, 
    status:"200 OK",
    timeResponse:526
    
  },{

  hostID:5, 
  monitorDate:"2020-03-31 23:54:15",
  url:"https://www.seventh.com.br/", 
  statusCod: 200, 
  status:"200 OK",
  timeResponse:526
  
},{
hostID:6, 
monitorDate:"2020-03-31 23:54:15",
url:"https://www.seventh.com.br/", 
statusCod: 200, 
status:"200 OK",
timeResponse:526
}
], {});

},

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Monitors', null, {});
    
  }
};
