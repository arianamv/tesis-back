var express = require('express');
var usuarioRouter = express.Router();
var usuarioController = require('../../controllers/usuario/usuario.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

usuarioRouter.post('/insertarUsuario', passport.authenticate(['jwt'], { session: false }), usuarioController.usuarioInsertar);
usuarioRouter.post('/insertarUsuarioMasivo', passport.authenticate(['jwt'], { session: false }), usuarioController.usuarioInsertarMasivo);
usuarioRouter.post('/modificarUsuario', passport.authenticate(['jwt'], { session: false }), usuarioController.usuarioModificar);
usuarioRouter.post('/listarUsuario', passport.authenticate(['jwt'], { session: false }), pagination(10), usuarioController.usuarioListar); //
// usuarioRouter.get('/FotoUsuario', passport.authenticate(['jwt'],{ session: false }), usuarioController.usuarioFoto);
usuarioRouter.post('/mostrarUsuario', passport.authenticate(['jwt'], { session: false }), usuarioController.usuarioMostrar);
usuarioRouter.post('/deshabilitarUsuario', passport.authenticate(['jwt'], { session: false }), usuarioController.usuarioDeshabilitar);
usuarioRouter.post('/habilitarUsuario', passport.authenticate(['jwt'], { session: false }), usuarioController.usuarioHabilitar);
module.exports = usuarioRouter;
