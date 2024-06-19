var express = require('express');
var aplicacionRouter = express.Router();
var aplicacionController = require('../../controllers/aplicacion/aplicacion.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

aplicacionRouter.get('/listarAplicaciones', aplicacionController.aplicacionesListar); //

module.exports = aplicacionRouter;
