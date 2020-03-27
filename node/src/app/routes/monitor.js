const routes = require('express').Router();
const validator = require('express-joi-validation').createValidator({})

const MonitorController = require('../../app/controllers/MonitorController')
const schemas = require('../schemas/schemas')

routes.get("/monitor", MonitorController.getAllMonitor);    
routes.post("/monitor", validator.body(schemas.post), MonitorController.addMonitor);    
routes.get("/monitor/:id", validator.params(schemas.get), MonitorController.getMonitortById);    

module.exports = routes;