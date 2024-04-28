var express = require('express');
var perfilRouter = express.Router();
var perfilController = require('../../controllers/usuario/perfil.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')


perfilRouter.post('/insertarPerfil', perfilController.perfilInsertar);
perfilRouter.get('/listarPerfiles', passport.authenticate(['jwt'], { session: false }), pagination(3), perfilController.perfilListarRutas);
module.exports = perfilRouter;
