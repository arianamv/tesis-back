var express = require('express');
var evaluacionRouter = express.Router();
var evaluacionController = require('../../controllers/evaluacion/evaluacion.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

evaluacionRouter.get('/listarEvaluacionesXSemana', evaluacionController.evaluacionesXSemanaListar); //
evaluacionRouter.get('/listarEvaluaciones', evaluacionController.evaluacionesListar);
evaluacionRouter.get('/listarSemanas', evaluacionController.semanasListar);

module.exports = evaluacionRouter;
