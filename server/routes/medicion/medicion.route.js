var express = require('express');
var medicionRouter = express.Router();
var medicionController = require('../../controllers/medicion/medicion.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

//competenciaRouter.post('/insertarCompetencia', passport.authenticate(['jwt'],{ session: false }),competenciaController.competenciaInsertar);
medicionRouter.post('/insertarMedicion', passport.authenticate(['jwt'], { session: false }), medicionController.medicionInsertar);
medicionRouter.post('/insertarMedicionCompleto', passport.authenticate(['jwt'], { session: false }), medicionController.medicionInsertar2);
medicionRouter.post('/listarMedicionEspecialidad', passport.authenticate(['jwt'], { session: false }), pagination(10), medicionController.medicionEspecialidadListar);
medicionRouter.post('/listarMedicionCodigoNombreEspecialidad', passport.authenticate(['jwt'], { session: false }), medicionController.medicionCodigoNombreEspecialidadListar);
medicionRouter.post('/deshabilitarMedicion', passport.authenticate(['jwt'], { session: false }), medicionController.medicionDeshabilitar);
medicionRouter.post('/mostrarDetalleMedicion', passport.authenticate(['jwt'], { session: false }), medicionController.medicionDetalleMostrar);
medicionRouter.post('/exportarResultadoMedicion', passport.authenticate(['jwt'], { session: false }), medicionController.reportesHistoricoMediciones);
medicionRouter.post('/modificarPeriodoMedicion', passport.authenticate(['jwt'], { session: false }), medicionController.ModificarMedicionPeriodo);
medicionRouter.post('/duplicarMedicion', passport.authenticate(['jwt'], { session: false }), medicionController.medicionDuplicar);

module.exports = medicionRouter;