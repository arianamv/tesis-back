var express = require('express');
var plagaRouter = express.Router();
var plagaController = require('../../controllers/plaga/plaga.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

plagaRouter.get('/listarPlaga', plagaController.plagaListar); //

module.exports = plagaRouter;
