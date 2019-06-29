'use strict'

var express = require('express');
var userController = require('../controllers/user');

var router = express.Router();

// Rutas de Pruebas
router.get('/probando', userController.probando);
router.post('/probando', userController.testeando);   


// Rutas API OFICIAL xd

// Rutas de Usuario

router.post('/register', userController.save);


module.exports = router;