'use strict'

var Topic = require('../models/topic');
var validator = require('validator');

var controller = 
{
    test: function(request, response)
    {
        return response.status(200).send({
            messague: 'Controlller topic funcionando'
        });
    },

    save: function(request, response)
    {

        // Recoger los parametros por Post
            var params = request.body;
            // Esto lo convierte a JSON por el metodo de bodyParse app.js

        // Validar los datos
            try 
            {
                var validate_title = !validator.isEmpty(params.title);
                var validate_content = !validator.isEmpty(params.content);
                var validate_lang = !validator.isEmpty(params.lang);
            }
            catch
            {
                return response.status(200).send({
                    messague: 'Faltan datos por Enviar'
                });
            }

        if(validate_title && validate_content && validate_lang)
        {
            // Crear el objeto a Guardar
                var topic = new Topic();
            
            // Asignar valores
                topic.title = params.title;
                topic.content = params.content;
                topic.code = params.code;
                topic.lang = params.lang;

            // Guardar valores
                topic.save((err, topicStored)=>{

                    // Devolver una respuesta
                    if(err || !topicStored)
                    {
                        return response.status(400).send({
                            messague: 'Error al save Topic'
                        });
                    }
                    return response.status(200).send({
                        messague: 'Topic Guardada',
                        topicStored
                    });
                });
            
        }
        else
        {   
            return response.status(201).send({
                messague: 'Los datos no son Validos'
            });
        }
    },
    
};

module.exports = controller;