var express = require('express');
var pesticidaRouter = express.Router();
var pesticidaController = require('../../controllers/pesticida/pesticida.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

pesticidaRouter.get('/listarPesticida', pesticidaController.pesticidaListar); //
pesticidaRouter.get('/listarPesticidaXPlaga', pesticidaController.pesticidaXPlagaListar); //
pesticidaRouter.get('/listarMetodosAplicacion', pesticidaController.metodosAplicacionListar);
pesticidaRouter.post('/listarMejoresPesticidas', pesticidaController.mejoresPesticidasListar);
pesticidaRouter.post('/insertarPesticida', pesticidaController.pesticidaInsertar);
pesticidaRouter.post('/modificarPesticida', pesticidaController.pesticidaModificar);
pesticidaRouter.post('/eliminarPesticida', pesticidaController.pesticidaEliminar);

module.exports = pesticidaRouter;
