var express = require('express');
var facultadRouter = express.Router();
var facultadController = require('../../controllers/usuario/facultad.controller');
//var estaAutenticado = require( '../../middlewares/autenticador');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

facultadRouter.post('/insertarFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadInsertar);
facultadRouter.post('/listarFacultades', passport.authenticate(['jwt'], { session: false }), pagination(10), facultadController.facultadListar);
facultadRouter.post('/insertarResponsablesFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadInsertarResponsables);
facultadRouter.post('/listarUsuariosQueNoSonDeFacultad', passport.authenticate(['jwt'], { session: false }), pagination(10), facultadController.facultadListarUsuarios);
facultadRouter.post('/deshabilitarResponsableFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadDeshabilitarResponsable);
facultadRouter.post('/mostrarDetalleFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadDetalleMostrar);
facultadRouter.post('/listarResponsablesFacultad', passport.authenticate(['jwt'], { session: false }), pagination(10), facultadController.facultadListarRes);
facultadRouter.post('/listarAsistentesFacultad', passport.authenticate(['jwt'], { session: false }), pagination(10), facultadController.facultadListarAsis);
facultadRouter.post('/modificarFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadModificar);
facultadRouter.post('/insertarAsistentesFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadInsertarAsistentes);
facultadRouter.post('/deshabilitarPerfilFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadDeshabilitarPerfil);
facultadRouter.post('/reemplazarResponsableFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadReemplazarResponsable);
facultadRouter.post('/habilitarFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadHabilitar);
facultadRouter.post('/deshabilitarFacultad', passport.authenticate(['jwt'], { session: false }), facultadController.facultadDeshabilitar);

module.exports = facultadRouter;
