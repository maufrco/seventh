const db = require('../models/index');

class MonitorController {

    async countMonitorHost(req, res, next){    
        const page = 0;
        try {
            const operation = await db.monitorModel.findAll({ 
                group: ['hostId'],
                attributes: ['hostId', [Sequelize.fn('COUNT', 'hostId'), 'HostCount']],
                order:[[ 'monitorDate', 'DESC']]})
            if(!operation){
                return res.status(404).send('Nenhum monitor encontrado')
            }else{
                return res.status(200).json(operation)
            }   
        }catch(e) {
            console.log(e)
            return res.status(400).send('Something broke!');
        }
    }

    async getAll(req, res, next){    
        const page = 0;
        try {
            const operation = await db.monitorModel.findAll({
                include: ['host'],
                group: ['hostId'],
                attributes: ['hostId', 'timeResponse', 'status','url'],
                order:[[ 'monitorDate', 'DESC']]
            })
            if(!operation){
                return res.status(404).send('Nenhum monitor encontrado')
            }else{
                return res.status(200).json(operation)
            }   
        }catch(e) {
            console.log(e)
            return res.status(400).send('Something broke!');
        }
    }
    async getAllMonitor(req, res, next){
        try{
        db.hostModel.findAll({  include: [ { model: db.monitorModel }] })
        .then(hosts => {
            const operation = hosts.map(obj => {
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

    async getMonitortById(req, res, next){
        const { id } = req.params;         
        try {
            const operation = await db.monitorModel.findAll({where:{hostId: id}, order:[[ 'monitorDate', 'DESC']]})
            if(!operation){
                return res.status(404).send('Nenhum Host encontrado')
            }else{
                return res.status(200).json(operation)
            }   
        }catch(e) {
            console.log(e);
            return res.status(400).send('Something broke!');
        }
    }
    async addMonitor(req, res, next){
        try {
            const {name, protocol, domain, path} = req.body;
            const operation = await db.monitorModel.create({Name:name, Protocol:protocol, Domain:domain, Path: path})
            if(!operation){
                return res.status(501).send('Falha na operação')
            }else{
                return res.status(200).json(operation)
            }
        }catch(err) {
            res.status(400).send(err);
        };
    }
}
module.exports = new MonitorController();