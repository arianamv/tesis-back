var express = require('express');
var planMejoraRouter = express.Router();
var planMejoraController = require('../../controllers/planMejora/planmejora.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

planMejoraRouter.post('/insertarPlanMejora', passport.authenticate(['jwt'], { session: false }), planMejoraController.planMejoraInsertar);
planMejoraRouter.post('/listarHistoricoPlanMejora', passport.authenticate(['jwt'], { session: false }), pagination(10), planMejoraController.planMejoraListar);
planMejoraRouter.post('/modificarPlanMejora', passport.authenticate(['jwt'], { session: false }), planMejoraController.planMejoraModificar);
planMejoraRouter.post('/listarActivosPlanMejora', passport.authenticate(['jwt'], { session: false }), pagination(10), planMejoraController.planMejoraActivoListar);
planMejoraRouter.post('/deshabilitarPlanMejora', passport.authenticate(['jwt'], { session: false }), planMejoraController.planMejoraAnular);
planMejoraRouter.post('/exportarPlanMejora', passport.authenticate(['jwt'], { session: false }), planMejoraController.planMejoraExportarReporte);


module.exports = planMejoraRouter;