var express = require('express');
var especialidadRouter = express.Router();
var especialidadController = require('../../controllers/usuario/especialidad.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

especialidadRouter.post('/insertarEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadInsertar);
especialidadRouter.post('/listarEspecialidad', passport.authenticate(['jwt'], { session: false }), pagination(10), especialidadController.especialidadListar);
especialidadRouter.post('/listarUsuariosNoDeEspecialidad', passport.authenticate(['jwt'], { session: false }), pagination(10), especialidadController.especialidadListarUsuarios);
especialidadRouter.post('/deshabilitarEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadDeshabilitar);
especialidadRouter.post('/actualizarParametros', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadActualizarParametros);
especialidadRouter.post('/listarEspecialidadXFacultad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadListarXFacultad);
especialidadRouter.post('/mostrarDetalleEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadDetalleMostrar);
especialidadRouter.post('/listarResponsablesEspecialidad', passport.authenticate(['jwt'], { session: false }), pagination(10), especialidadController.especialidadListarRes);
especialidadRouter.post('/listarAsistentesEspecialidad', passport.authenticate(['jwt'], { session: false }), pagination(10), especialidadController.especialidadListarAsis);
especialidadRouter.post('/insertarResponsablesEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadInsertarResponsables);
especialidadRouter.post('/modificarEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadModificar);
especialidadRouter.post('/reactivarEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadReactivar);
especialidadRouter.post('/insertarAsistentesEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadInsertarAsistentes);
especialidadRouter.post('/deshabilitarPerfilEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadDeshabilitarPerfil);
especialidadRouter.post('/reemplazarResponsableEspecialidad', passport.authenticate(['jwt'], { session: false }), especialidadController.especialidadReemplazarResponsable);
especialidadRouter.post('/verificarParametrosExistentes', passport.authenticate(['jwt'], { session: false }), especialidadController.verificarParametrosExistentes);

module.exports = especialidadRouter;
