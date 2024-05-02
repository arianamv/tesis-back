var express = require('express');
var usuarioRouter = express.Router();
var usuarioController = require('../../controllers/usuario/usuario.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

usuarioRouter.get('/listarUsuario', usuarioController.usuarioListar); //

module.exports = usuarioRouter;