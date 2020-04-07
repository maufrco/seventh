const routes = require('express').Router();
const validator = require('express-joi-validation').createValidator({})

const schemas = require(__dirname + '/../schemas/schemas')
const HostController = require(__dirname + '/../../app/controllers/HostController')
    
routes.get('/', (req, res) => res.send('Teste Seventh API'));

routes.get("/host", HostController.getAllHosts);    
routes.post("/host", validator.body(schemas.post), HostController.addHost);    
routes.delete("/host/:id",validator.params(schemas.delete), HostController.deleteHost);    
module.exports = routes;