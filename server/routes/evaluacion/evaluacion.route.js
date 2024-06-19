var express = require('express');
var evaluacionRouter = express.Router();
var evaluacionController = require('../../controllers/evaluacion/evaluacion.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

evaluacionRouter.post('/listarEvaluacionesXSemana', evaluacionController.evaluacionesXSemanaListar); //
evaluacionRouter.get('/listarEvaluaciones', evaluacionController.evaluacionesListar);
evaluacionRouter.get('/listarSemanas', evaluacionController.semanasListar);
evaluacionRouter.get('/listarGravedades', evaluacionController.gravedadesListar);
evaluacionRouter.post('/listarPlagasActivas', evaluacionController.plagasActivasListar);

module.exports = evaluacionRouter;
