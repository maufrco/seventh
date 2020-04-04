const db = require(__dirname + '/../models/index');

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
    async getAllMonitor(req, res, next){
        try{
            const operation = await db.hostModel.findAll({include: [ { model: db.monitorModel, as: 'results' }] })
            if(!operation){
                return res.status(404).send('Nenhum monitor encontrado')
            }else{
                return res.status(200).json(operation)
            }            
        }catch(e){
                console.log(e)
                res.status(400).send();
            }
        }
 
    async getMonitortById(req, res, next){   
        try{
            const id  = req.params.id; 

            let operation 
            id ? operation = await db.hostModel.findOne({where:{ID: id}, include: [ { model: db.monitorModel, as: 'results' }] }) : operation = await db.hostModel.findOne({include: [ { model: db.monitorModel, as: 'results' }] })

            if(!operation){
                return res.status(404).send('Nenhum monitor encontrado')
            }else{
                return res.status(200).json(operation)
            }            
        }catch(e){
                console.log(e)
                res.status(400).send();
            }
        }
    async addMonitor(req, res, next){
        try {
            const {name, protocol, domain, path} = req.body;
            const operation = await db.monitorModel.create({name:name, protocol:protocol, domain:domain, path: path})
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