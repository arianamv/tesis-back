var express = require('express');
var rubricaRouter = express.Router();

var rubricaController = require('../../controllers/competencia/rubrica.controller');
var passport = require('passport');

rubricaRouter.post('/insertarRubrica', passport.authenticate(['jwt'], { session: false }), rubricaController.rubricaInsertar);
rubricaRouter.post('/listarRubrica', passport.authenticate(['jwt'], { session: false }), rubricaController.rubricaListarIndicador);

module.exports = rubricaRouter;