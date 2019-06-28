'use strict'

var express = require('express');
var userController = require('../controllers/user');

var router = express.Router();

router.get('/probando', userController.probando);
router.post('/probando', userController.testeando);   

module.exports = router;