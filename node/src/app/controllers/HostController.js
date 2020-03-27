const db = require('../models/index');


class HostController {
    async getAllHosts(req, res, next){    
        const page = 0;
        try {
            const operation = await db.hostModel.findAll({offset:page, limit: 3})
            console.log(operation)
            if(!operation){
                return res.status(404).send('Nenhum host encontrado')
            }else{
                return res.status(200).json(operation)
            }   
        }catch(e) {
            return res.status(400).send('Something broke!');
        }
    }
    async getHostById(req, res, next){
        const { id } = req.params;         
        try {
            const operation = await db.hostModel.findByPk(id)
            if(!operation){
                return res.status(404).send('Nenhum Host encontrado')
            }else{
                return res.status(200).json(operation)
            }   
        }catch(e) {
            return res.status(400).send('Something broke!');
        }
    }
    async addHost(req, res, next){
        try {
            const {name, protocol, domain, path} = req.body;
            const operation = await db.hostModel.create({Name:name, Protocol:protocol, Domain:domain, Path: path})
            if(!operation){
                return res.status(501).send('Falha na operação')
            }else{
                return res.status(200).json(operation)
            }
        }catch(err) {
            res.status(400).send(err);
        };
    }
    async updateHost(req, res, next){
    try {
        const {id, name, protocol, domain, path} = req.body;
        const operation = await db.hostModel.update({Name:name, Protocol:protocol, Domain:domain, Path: path},{where: { id: id }})
        if(!operation){
            return res.status(501).send('Falha na operação')
        }else{
            return res.status(200).json(operation)
        }
    }catch(err) {
        res.status(400).send(err);
    };
    }
    async deleteHost(req, res, next){
        try {
            const { id } = req.params;  
            const operation = await db.hostModel.destroy({where: { id: id }})
            if(!operation){
                return res.status(501).send('Falha na operação')
            }else{
                return res.status(200).json(operation)
            }
        }catch{
            res.status(400).send();
        }
    }
    async getAll(req, res, next){

        try{
        db.hostModel.findAll({  include: [ { model: db.monitorModel }] })
        .then(hosts => {
            const operation = hosts.map(obj => {
                console.log(obj.monitors[0])
              return Object.assign(
                {},
                {
                  id: obj.id,
                  name: obj.name,
                  result: obj.monitors.map(metric => {
                    return Object.assign(
                      {},
                      {
                        ID:metric.id,
                        monitorDate: metric.monitorDate,
                        url: metric.url,
                        status: metric.status,
                        statusCod: metric.statusCod,
                        timeResponse: metric.timeResponse
                      }
                      )
                  })
                }
              )
            });
            res.status(200).json(operation)
          });
        }catch(e){
            console.log(e)
            res.status(400).send();
        }
    }

}
module.exports = new HostController();


