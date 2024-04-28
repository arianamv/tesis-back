var express = require('express');
var cuentaRouter = express.Router();
var cuentaController = require('../../controllers/cuenta/cuenta.controller');
var passport = require('passport');

cuentaRouter.post('/modificarCuenta', passport.authenticate(['jwt'], { session: false }), cuentaController.usuarioModificar);
cuentaRouter.post('/recuperarContrasenia', cuentaController.cuentaRecuperarContrasenia);
cuentaRouter.post('/cambiarContrasenia', cuentaController.cuentaCambiarContrasenia);

module.exports = cuentaRouter;
