'use strict'

var jwt = require('jwt-simple');

// Utiliza momments.js para calcular la fecha de caducacion del token
var  momment = require('moment');

exports.createtoken = function(user)
{
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: momment().unix(),
        exp: momment().add(30, 'days').unix
    };
    // Todos los datos de usuario  

    return jwt.encode(payload, 'clave-secret');
}