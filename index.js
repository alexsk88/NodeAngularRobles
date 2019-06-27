'use strict'
// Usar modo estricto para buenas practica
// ayuda al codigo


var mongoose = require('mongoose');
// Cargar libreria de Mongoose

mongoose.Promise = global.Promise;
// Le digo a moongose que utlize promesas

mongoose.connect('mongodb://localhost:27017/api-rest-node', {useNewUrlParser: true})
        .then(()=>{
            console.log('La connexion a MOnGODB well DONE');
        }).catch(errro=> console.log("Aui error", error));