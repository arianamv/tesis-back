var express = require('express');
var plagaRouter = express.Router();
var plagaController = require('../../controllers/plaga/plaga.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

plagaRouter.get('/listarPlaga', plagaController.plagaListar); //
plagaRouter.post('/insertarPlaga', plagaController.plagaInsertar); //
plagaRouter.post('/modificarPlaga', plagaController.plagaModificar); //
plagaRouter.post('/eliminarPlaga', plagaController.plagaEliminar); //

module.exports = plagaRouter;
