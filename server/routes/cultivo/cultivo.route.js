var express = require('express');
var cultivoRouter = express.Router();
var cultivoController = require('../../controllers/cultivo/cultivo.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

cultivoRouter.get('/listarCultivo', cultivoController.cultivoListar); //
cultivoRouter.get('/listarVariedades', cultivoController.variedadesListar); //
cultivoRouter.post('/listarVariedadesXCultivo', cultivoController.variedadesXCultivoListar); //

module.exports = cultivoRouter;
