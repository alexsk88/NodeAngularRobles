'use strict'

// Librerias
var validator = require('validator');
var User = require('../models/user');
var bcryp = require('bcrypt');
var jwt = require('../services/jwt');

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
        try
        {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.surname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }
        catch(error)
        {
            return response.status(400).send({
                messague: "No se ha enviado dato/s"
            });
        }
        
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

        try
        {
            var validate_password = !validator.isEmpty(params.password);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        }
        catch(error)
        {
            return response.status(400).send({
                messague: "Campos sin rellenar"
            });
        }

        if(!validate_email || !validate_password)
            {
                return response.status(400).send({
                    messague: "No se ha enviado dato/s"
                });
            }
            else
            {
                
                User.findOne({email: params.email.toLowerCase()},(error, issetuser)=>{

                    if(error)
                    {
                        return response.status(500).send({
                            message: "Error Con el Servidor",
                            type: "Buscando Usuario en MongoDB"
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
                                return response.status(500).send({
                                    message: "Error del servidor",
                                    type: "Comparando bcrypt"
                                });
                            }
                            if(res)
                            {
                                // Limpiar el objeto 

                                issetuser.password = undefined;
                                // issetuser.__v = undefined;


                                // Generar token de JWT

                                if (params.getToken)
                                {
                                    return response.status(200).send({
                                        token: jwt.createtoken(issetuser)
                                    });
                                }
                                else
                                {
                                    return response.status(200).send({
                                        message: "success",
                                        user: issetuser
                                    });
                                }
                                
                            }
                            else
                            {
                                return response.status(400).send({
                                    message: "La contraseña NOO coincide",
                                });
                            }
                            
                        });
                    }
                    else
                    {
                        return response.status(404).send({
                            message: "Usuario No encontrado"
                        });
                    }

                });
            
            }
            
    },

    update: function (request, response)
    {
        
        // Crear midleware, para comprobar el usuario

        /* AL CRUZAR LA REQUEST POR EL MIDLE SE AÑADE UNA PROPIEDAD LLAMADA USER OJO OJO OJO*/
        // Recoger datos del usuario
        var update_params= request.body;

        // Validar Datos
        try
        {
            var validate_name = !validator.isEmpty(update_params.name);
            var validate_surname = !validator.isEmpty(update_params.surname);
            var validate_email = !validator.isEmpty(update_params.email) && validator
                                           .isEmail(update_params.email);
        }
        catch(error)
        {
            return response.status(400).send({
                messague: "No se ha enviado dato/s"
            });
        }


        // Comprobar si el email ya exisite

        if(request.user.email != update_params.email)
        {

            User.findOne({email: update_params.email}, (err, user)=>{
                if(err)
                {
                    return response.status(500).send({
                        message: 'Error con el servidor',
                        type: 'Search and check emailuser repeat'
                        
                    });
                }
                
                if(user)
                {
                    return response.status(400).send({
                        message: 'El email ya existe',
                        email: user.email
                    });
                }
            });
        }
        else
        {
            
            // Eliminar propiedades inncesarias
            delete update_params.password;

            // Buscar y actualizar Documento

            var userId = request.user.sub;
            // console.log(userId);
            

            // User.findOneAndUpdate(condicion, datos a actualizar, opcion, callback)
            // {new: true} => devuelve los datos ya actualizados ¿, no los viejos 
            User.findOneAndUpdate({_id: userId}, update_params, {new: true},(err, UserUpdated)=>{
                if(err)
                {
                    return response.status(500).send({
                        message: 'Error con el servidor',
                        error: err,
                        type: 'Buscar y Actualizar'
                    });
                }

                if(!UserUpdated)
                {
                    return response.status(400).send({
                        message: 'Error al Actualizar el User'
                    });
                }

                return response.status(200).send({
                    status: 'Success',
                    UserUpdated
                });
            });
        }    
    },

    uploadAvatar: function (request, response)
    {

        // Configurar el modulo multiparty -> Para subir ficheros

        // Recoger el fichero de la peticion

        // Conseguir el nombre y la extension de Archivo subido
            // Si no es valido borrar fichero subido

        // Vamos a comprobar extension (solo imagenes)

        // Sacar el ID del usuario identificado

        // Hacer el Update en MogoDB

        // Devolver una respustes



        return response.status(200).send({
            status: 'Upload Listo',
        });
    },
};

module.exports = controller;

// Crea un OBJETO con funciones como si fuera una especie
// de clase, woooouuuuu severo   

