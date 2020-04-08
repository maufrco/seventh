const routes = require('express').Router();
const validator = require('express-joi-validation').createValidator({})

const schemas = require(__dirname + '/../schemas/schemas')
const MonitorController = require(__dirname + '/../../app/controllers/MonitorController')

   

routes.get("/monitor/host/:id", validator.params(schemas.get), MonitorController.getMonitortByHostId);    
routes.get("/monitor/:id", validator.params(schemas.get), MonitorController.getMonitortById);    
routes.post("/monitor", validator.body(schemas.monitor), MonitorController.addMonitor);    

module.exports = routes;