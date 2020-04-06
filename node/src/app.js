require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');
const fs = require("fs");
const cors = require('cors');

class AppController {
    constructor(){        

        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(express.json());
        this.express.use(cors());
    }

    routes(){
        fs.readdirSync(__dirname+"/app/routes")
        .filter(file => {
          return (file.indexOf('.') !== 0) &&  (file.slice(-3) === '.js');
        })
        .forEach(file => {
            this.express.use(require(__dirname+"/app/routes/" + file)); 
        });       
    }
}
module.exports = new AppController().express;