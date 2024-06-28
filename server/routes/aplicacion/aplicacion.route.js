var express = require('express');
var aplicacionRouter = express.Router();
var aplicacionController = require('../../controllers/aplicacion/aplicacion.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

aplicacionRouter.post('/insertarAplicacion', aplicacionController.aplicacionInsertar); //
aplicacionRouter.post('/modificarAplicacion', aplicacionController.aplicacionModificar); //
aplicacionRouter.post('/eliminarAplicacion', aplicacionController.aplicacionEliminar); //
aplicacionRouter.get('/listarAplicaciones', aplicacionController.aplicacionesListar); //
aplicacionRouter.post('/listarAplicacionesXCampania', aplicacionController.aplicacionesXCampañaListar); //
aplicacionRouter.post('/listarAplicacionesXCampaniaXFundo', aplicacionController.aplicacionesXCampañaXFundoListar); //

module.exports = aplicacionRouter;
