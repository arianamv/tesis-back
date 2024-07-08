var express = require('express');
var usuarioRouter = express.Router();
var usuarioController = require('../../controllers/usuario/usuario.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

usuarioRouter.get('/listarUsuario', usuarioController.usuarioListar); //
usuarioRouter.get('/listarUsuarioXFundo', usuarioController.usuariosXFundoListar); //
usuarioRouter.get('/listarEvaluadores', usuarioController.evaluadoresListar); //
usuarioRouter.post('/insertarUsuario', usuarioController.usuarioInsertar); //
usuarioRouter.post('/modificarUsuario', usuarioController.usuarioModificar); //
usuarioRouter.post('/eliminarUsuario', usuarioController.usuarioEliminar); //
usuarioRouter.post('/login', usuarioController.login); //



module.exports = usuarioRouter;
