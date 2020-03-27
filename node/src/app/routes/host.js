const routes = require('express').Router();
const validator = require('express-joi-validation').createValidator({})
const Joi = require('@hapi/joi')
const schemas = require('../schemas/schemas')
const HostController = require('../../app/controllers/HostController')

routes.get("/", HostController.getAll);    
routes.get("/host", HostController.getAllHosts);    
routes.post("/host", validator.body(schemas.post), HostController.addHost);    
routes.put("/host", HostController.updateHost);    
routes.get("/host/:id", validator.params(schemas.get), HostController.getHostById);    
routes.delete("/host/:id",validator.params(schemas.delete), HostController.deleteHost);    

module.exports = routes;