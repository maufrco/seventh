const db = require(__dirname + '/../models/index');

class HostController {

    async getAllHosts(req, res, next){    
        try {
            //pagination
            //const operation = await db.hostModel.findAll({offset:0, limit: 3})
            const operation = await db.hostModel.findAll()
            if(!operation){
                return res.status(404).send('Nenhum host encontrado')
            }else{
                return res.status(200).json(operation)
            }   
        }catch(e) {
            return res.res.sendStatus(500);
        }
    }
    async addHost(req, res, next){
        try {
            const {name, protocol, domain, path} = req.body;
            const operation = await db.hostModel.create({name:name, protocol:protocol, domain:domain, path: path})
            if(!operation){
                return res.res.sendStatus(404)
            }else{
                return res.status(201).json(operation)
            }
        }catch(err) {
           return res.status(500).send(err);
        };
    }
    async deleteHost(req, res, next){
        const transaction = await db.sequelize.transaction();
        try {
            const { id } = req.params;  
           const operation =  await db.hostModel.destroy({where: { id: id }}, {transaction:transaction})
            await db.monitorModel.destroy({where: { hostID: id }}, {transaction:transaction})
            await transaction.commit();

            return res.status(200).json({ id: id })
            
        }catch(e){
            console.log(e)
            transaction.rollback();
            return res.sendStatus(500)
        }
    }
}
module.exports = new HostController();

