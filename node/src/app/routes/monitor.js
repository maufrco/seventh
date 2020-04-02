const routes = require('express').Router();
const validator = require('express-joi-validation').createValidator({})

const MonitorController = require(__dirname + '/../../app/controllers/MonitorController')
const schemas = require(__dirname + '/../schemas/schemas')

routes.get("/monitor", MonitorController.getAllMonitor);    
routes.get("/monitor/:id", validator.params(schemas.get), MonitorController.getMonitortById);    
routes.post("/monitor", validator.body(schemas.post), MonitorController.addMonitor);    

module.exports = routes;