var express = require('express');
var coordenadaRouter = express.Router();
var coordenadaController = require('../../controllers/coordenada/coordenada.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

coordenadaRouter.post('/listarCoordenadaXLote', pagination(10), coordenadaController.coordenadaXLoteListar); //

module.exports = coordenadaRouter;
