var express = require('express');
var propuestaRouter = express.Router();
var propuestaController = require('../../controllers/planMejora/propuesta.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

propuestaRouter.post('/listarPropuestasPorIdPlanMejora', passport.authenticate(['jwt'], { session: false }), pagination(10), propuestaController.propuestaListar);
propuestaRouter.post('/modificarPropuesta', passport.authenticate(['jwt'], { session: false }), propuestaController.propuestaModificar);
propuestaRouter.post('/insertarPropuesta', passport.authenticate(['jwt'], { session: false }), propuestaController.propuestaInsertar);
propuestaRouter.post('/eliminarPropuesta', passport.authenticate(['jwt'], { session: false }), propuestaController.propuestaEliminar);
// propuestaRouter.post('/insertarPropuesta', passport.authenticate(['jwt'], { session: false }), propuestaController.propuestaInsertar);

module.exports = propuestaRouter;