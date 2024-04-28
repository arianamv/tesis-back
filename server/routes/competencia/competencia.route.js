var express = require('express');
var competenciaRouter = express.Router();
var competenciaController = require('../../controllers/competencia/competencia.controller');
//var estaAutenticado = require( '../../middlewares/autenticador');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

competenciaRouter.post('/insertarCompetencia', passport.authenticate(['jwt'], { session: false }), competenciaController.competenciaInsertar);
competenciaRouter.post('/modificarCompetencia', passport.authenticate(['jwt'], { session: false }), competenciaController.competenciaModificar);
competenciaRouter.post('/deshabilitarCompetencias', passport.authenticate(['jwt'], { session: false }), competenciaController.competenciaDeshabilitar);
competenciaRouter.post('/listarCompetencia', passport.authenticate(['jwt'], { session: false }), pagination(10), competenciaController.competenciaListar);
competenciaRouter.post('/exportarCompetencia', passport.authenticate(['jwt'], { session: false }), competenciaController.competenciasHistorico);

module.exports = competenciaRouter;
