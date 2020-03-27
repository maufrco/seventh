const routes = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require(__dirname + '/../../../swagger/swagger.json');
 
routes.use('/doc', swaggerUi.serve);
routes.get('/doc', swaggerUi.setup(swaggerDocument));
  
module.exports = routes;