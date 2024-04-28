var express = require('express');
var reportesRouter = express.Router();
var reportesController = require('../../controllers/combobox/reportes.controller');
//var estaAutenticado = require( '../../middlewares/autenticador');
var passport = require('passport');
var pagination = require('../../middlewares/pagination');

reportesRouter.get('/listarCiclos', passport.authenticate(['jwt'], { session: false }), pagination(10), reportesController.listarCiclos);
reportesRouter.get('/listarCompetencias', passport.authenticate(['jwt'], { session: false }), reportesController.listarCompetencias);
reportesRouter.get('/listarCursos', passport.authenticate(['jwt'], { session: false }), reportesController.listarCursos);
reportesRouter.post('/listarCursosXEspecialidad', passport.authenticate(['jwt'], { session: false }), reportesController.ReplistarCursosXEspecialidad);
reportesRouter.post('/listarCompetenciasXEspecialidad', passport.authenticate(['jwt'], { session: false }), reportesController.listarCompetenciasXEspecialidad);


module.exports = reportesRouter;