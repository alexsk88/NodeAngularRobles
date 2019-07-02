'use strict'

// Librerias
var validator = require('validator');
var User = require('../models/user');
var bcryp = require('bcrypt');
var jwt = require('jwt-simple');

// Como una clase

var controller = 
{
    probando: function(request, response)
    {
        return response.status(200).send({
            message: "Soy el metodo probando"
        });
    },

    testeando: function(request, response)
    {
        return response.status(200).send({
            message: "Soy el metodo testeando"
        });
    },

    save: function(request, response){
        // Recojer los parametros de la peticion
        var params = request.body;

        // Validar los datos

        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);


        // console.log(validate_name,
        //     validate_surname,
        //     validate_email,
        //     validate_password);

        if(validate_name && validate_surname && validate_email && validate_password)
        {
            // Crear el objeto de Usuario
            var user = new User();

            // Asignar valores al Objeto
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_USER';
            user.image = null;

            // Comprobar que usuario existe
            User.findOne({email: user.email}, (error, issetUser) => {
                // Con findOne => Busca un user en MongoDB
                // Ver documentacion
                if(error)
                {
                    return response.status(500).send({
                        message: "Error al comprbar duplicidad del Usario",
                        errorserver : error
                    });
                }

                if(!issetUser)
                {// Si no existe el usuario
                    
                    
                    //cifrar la password
                    bcryp.hash(params.password, 10, (err, hash) =>{
                        user.password = hash;
                        // Cifrar la Password 
                        
                        // Guardar Usuario

                        user.save((err, userStored)=>{
                            if(err)
                            {
                                return response.status(400).send({
                                    message: "Error al guardar el usuario, SERVER",
                                    errorserver : err
                                });
                            }

                            if(userStored)
                            {
                                return response.status(200).send({
                                    message: "Usuario Saving Correctamente",
                                    user: userStored
                                });
                            }
                            else
                            {
                                return response.status(400).send({
                                    message: "Usuario No se ha Guardado",
                                });
                            }
                        });
              
                    });

                }
                else
                {
                    return response.status(200).send({
                        message: "El usuario YA EXISTE"
                    });
                }
            });


            }
        else
        {
            return response.status(400).send({
                message: "La validacion de datos es incorrecta"
            });
        }
        
    },

    login: function(request, response)
    {
        // Recojer los parametros de la peticion
        var params = request.body;

        // Validar los datos
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);

        if(!validate_email || !validate_password)
            {
                return response.status(400).send({
                    messague: "Los datos no son validos"
                });
            }
            else
            {
                
                User.findOne({email: params.email.toLowerCase()},(error, issetuser)=>{

                    if(error)
                    {
                        return response.status(500).send({
                            message: "Error Con el Servidor"
                        });
                    }

                    if(issetuser)
                    {

                        // Si lo encuentra
                        
                        // response.status(200).send({
                        //     message: "Usuario Encontrado correctly",
                        //     user: issetuser,
                        //     pass: issetuser.password
                        // });

                        // Comprobar la contraseña
                        // Coincidencia del email y password (ByCryp compare)
                        bcryp.compare(params.password, issetuser.password, function(err, res) {
                            if(err)
                            {
                                response.status(500).send({
                                    message: "Error del servidor"
                                });
                            }
                            if(res)
                            {
                                response.status(500).send({
                                    message: "La contraseña coincide",
                                });
                                

                                // Generar token de JWT

                                // Si todo es correcto, devolver datos
                            }
                            else
                            {
                                response.status(500).send({
                                    message: "La contraseña NOO coincide",
                                });
                            }
                            
                        });
                    }
                    else
                    {
                        response.status(200).send({
                            message: "Usuario No encontrado"
                        });
                    }

                });
            
            }
            
    }
};

module.exports = controller;

// Crea un OBJETO con funciones como si fuera una especie
// de clase, woooouuuuu severo   

