const Joi = require('@hapi/joi')
const schemas = { 
    post: Joi.object().keys({ 
        name: Joi.string().required(),
        protocol: Joi.string().required().valid('http://', 'https://'),
        domain: Joi.string().required(),
        path: Joi.string().allow('').optional()
    }),
    get: Joi.object().keys({ 
        id: Joi.number().integer().required()
    }),
    delete:Joi.object().keys({ 
        id: Joi.number().integer().required()
    }),
    monitor: Joi.object().keys({ 
        hostId: Joi.number().integer().required(),
        url: Joi.string().required(),
        status: Joi.string().allow('').optional(),
        statusCod: Joi.number().integer().required(),
        timeResponse: Joi.number().integer().required(),
        monitorDate: Joi.date().required()
    })
}
module.exports = schemas;