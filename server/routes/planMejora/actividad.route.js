var express = require('express');
var actividadRouter = express.Router();
var actividadController = require('../../controllers/planMejora/actividad.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

actividadRouter.post('/listarActividadesPorIdPropuesta', passport.authenticate(['jwt'], { session: false }), pagination(10), actividadController.actividadListar);
actividadRouter.post('/listarActividadPorIdActividad', passport.authenticate(['jwt'], { session: false }), actividadController.actividadListarUnaActividad);
actividadRouter.post('/insertarActividad', passport.authenticate(['jwt'], { session: false }), actividadController.actividadInsertar);
actividadRouter.post('/modificarActividad', passport.authenticate(['jwt'], { session: false }), actividadController.actividadModificar);

//actividadRouter.post('/modificarActividad', passport.authenticate(['jwt'], { session: false }), actividadController.actividadModificar);

actividadRouter.post('/eliminarActividad', passport.authenticate(['jwt'], { session: false }), actividadController.actividadEliminar);
actividadRouter.post('/listarEvidencia', passport.authenticate(['jwt'], { session: false }), actividadController.listarEvidencias);
actividadRouter.post('/eliminarEvidencia', passport.authenticate(['jwt'], { session: false }), actividadController.eliminarEvidencias);
actividadRouter.post('/descargarEvidencia', passport.authenticate(['jwt'], { session: false }), actividadController.descargarEvidencia);

module.exports = actividadRouter;