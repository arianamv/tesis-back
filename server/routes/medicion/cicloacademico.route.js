var express = require('express');
var cicloAcademicoRouter = express.Router();
var pagination = require('../../middlewares/pagination')
var cicloAcademicoController = require('../../controllers/medicion/cicloacademico.controller');
var passport = require('passport');

//competenciaRouter.post('/insertarCompetencia', passport.authenticate(['jwt'],{ session: false }),competenciaController.competenciaInsertar);
cicloAcademicoRouter.post('/insertarCicloAcademico', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.cicloAcademicoInsertar);
cicloAcademicoRouter.post('/modificarCicloAcademico', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.cicloAcademicoModificar);
cicloAcademicoRouter.post('/anularCicloAcademico', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.cicloAcademicoAnular);
cicloAcademicoRouter.post('/listarCicloAcademico', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.cicloAcademicoListar);
cicloAcademicoRouter.get('/listarCicloAcademicoDesde', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.cicloAcademicoListarDesde);
cicloAcademicoRouter.get('/listarCicloAcademicoHasta', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.cicloAcademicoListarHasta);
cicloAcademicoRouter.get('/listarCicloAcademicoDesdeHasta', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.cicloAcademicoListarDesdeHasta);
cicloAcademicoRouter.post('/listarCicloAcademicoPag', passport.authenticate(['jwt'], { session: false }), pagination(10), cicloAcademicoController.cicloAcademicoListarPag);	
cicloAcademicoRouter.post('/listarCicloAcademicoDupMedicion', passport.authenticate(['jwt'], { session: false }), cicloAcademicoController.dupMedicionCicloAcademicoListar);

module.exports = cicloAcademicoRouter;