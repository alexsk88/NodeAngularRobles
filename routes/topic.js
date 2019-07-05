'use strict'

var express = require('express');
var TopicController = require('../controllers/topic');
var router = express.Router();
var md_auth = require('../middlewares/auth');



router.get('/test', TopicController.test);  

// Guardar Topic
router.post('/topic', md_auth.auth, TopicController.save);  


// Listar Topics con Paginador WUAAAAU
router.get('/topics/:page?', TopicController.getTopics);  

module.exports = router;