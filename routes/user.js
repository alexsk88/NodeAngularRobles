'use strict'

var express = require('express');
var userController = require('../controllers/user');

// Cargar Routing de Express
var router = express.Router();

// Cargar Middleware
var md_auth = require('../middlewares/auth');


// Rutas de Pruebas
router.get('/probando', userController.probando);
router.post('/probando', userController.testeando);   


// Rutas API OFICIAL xd

// Rutas de Usuario

router.post('/register', userController.save);
router.post('/login', userController.login);

// Estas rutas se complentan como una escalera
// Primero ejecuta md_auth.auth
// Segundo user.controller
// y si hubiera otro tambien lo hacia y asi
// NODE es mas breve y bonito
router.put('/update',md_auth.auth, userController.update);

// Asi se solicitan parametros por URL
router.post('/upload-avatar/:id', userController.uploadAvatar);


module.exports = router;