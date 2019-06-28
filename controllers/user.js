'use strict'

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
    }
};

module.exports = controller;

// Crea un OBJETO con funciones como si fuera una especie
// de clase, woooouuuuu severo   

