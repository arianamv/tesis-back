var express = require('express');
var indicadorRouter = express.Router();
var pagination = require('../../middlewares/pagination')

var indicadorController = require('../../controllers/competencia/indicador.controller');
var passport = require('passport');

indicadorRouter.post('/insertarIndicador', passport.authenticate(['jwt'], { session: false }), indicadorController.indicadorInsertar);
indicadorRouter.post('/modificarIndicador', passport.authenticate(['jwt'], { session: false }), indicadorController.indicadorModificar);
indicadorRouter.post('/listarIndicadorCompetencia', passport.authenticate(['jwt'], { session: false }), indicadorController.indicadorListarCompetencia);
indicadorRouter.post('/eliminarIndicador', passport.authenticate(['jwt'], { session: false }), indicadorController.indicadorEliminar);
indicadorRouter.post('/listarIndicadores', passport.authenticate(['jwt'], { session: false }), pagination(10), indicadorController.ListarIndicadores);
indicadorRouter.post('/insertarIndicadoresTodos', passport.authenticate(['jwt'], { session: false }), indicadorController.AgregarIndicadoresTodos);
indicadorRouter.post('/eliminarIndicadoresTodos', passport.authenticate(['jwt'], { session: false }), indicadorController.EliminarIndicadoresTodos);
indicadorRouter.post('/listarParametrosIndicador', passport.authenticate(['jwt'], { session: false }), indicadorController.ListarParametrosIndicador);

module.exports = indicadorRouter;