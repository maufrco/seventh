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
            const operation = await db.hostModel.create({name:name, protocol:protocol, domain:domain, path: path})
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
        const operation = await db.hostModel.update({name:name, protocol:protocol, domain:domain, path: path},{where: { id: id }})
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
        let transaction;
        try {
            const { id } = req.params;  
            const operation = await db.hostModel.destroy({where: { id: id }}, {transaction})
                  operation = await db.monitorModel.destroy({where: { hostID: id }})
            if(!operation){
                transaction.rollback();
                return res.status(501).send('Falha na operação')
            }else{
                await transaction.commit();
                return res.status(200).json(operation)
            }
        }catch(e){
            console.log(e)
            await transaction.commit();
            res.status(400).send();
        }
    }
}
module.exports = new HostController();


