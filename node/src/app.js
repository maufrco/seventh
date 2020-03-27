require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');
const fs = require("fs");
class AppController {
    constructor(){        
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(express.json());
    }

    routes(){
        fs.readdirSync("./src/app/routes")
        .filter(file => {
          return (file.indexOf('.') !== 0) &&  (file.slice(-3) === '.js');
        })
        .forEach(file => {
            this.express.use(require("./app/routes/" + file)); 
        });       
    }
}
module.exports = new AppController().express;