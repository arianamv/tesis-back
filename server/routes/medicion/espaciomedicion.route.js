var express = require('express');
var espacioMedicionRouter = express.Router();

var espacioMedicionController = require('../../controllers/medicion/espaciomedicion.controller');
var passport = require('passport');

espacioMedicionRouter.post('/insertarEspacioMedicion', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.espacioMedicionInsertar);
espacioMedicionRouter.get('/listarEspacioMedicion', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.EspacioMedicionListar);
espacioMedicionRouter.get('/listarEspacioMedicionNombreCurso', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.EspacioMedicionListarNombreCurso);
espacioMedicionRouter.post('/listarEspacioUnaMedicon', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.ListarEspacioMedicionDeUnaMuestra);
espacioMedicionRouter.post('/listarMuestrasEnEspacio', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.EspacioMedicionListarMuestras);
espacioMedicionRouter.post('/listarIndicadoresEnEspacio', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.EspacioMedicionListarIndicadores);
espacioMedicionRouter.post('/insertarEspacioMedicionTodo', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.AnadirEspacio);
espacioMedicionRouter.post('/eliminarEspacioMedicionTodo', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.EliminarEspacio);
espacioMedicionRouter.post('/modificarEspacioMedicionTodo', passport.authenticate(['jwt'], { session: false }), espacioMedicionController.ModificarEspacio);

module.exports = espacioMedicionRouter;