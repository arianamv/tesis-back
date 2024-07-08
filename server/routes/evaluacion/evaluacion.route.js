var express = require('express');
var evaluacionRouter = express.Router();
var evaluacionController = require('../../controllers/evaluacion/evaluacion.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

evaluacionRouter.post('/listarEvaluacionesXSemana', evaluacionController.evaluacionesXSemanaListar); //
evaluacionRouter.post('/listarLastEvaluacionesXSemana', evaluacionController.evaluacionesLastXSemanaListar); //
evaluacionRouter.post('/listarEvaluacionesXCampaniaXFundo', evaluacionController.evaluacionesXCampañaXFundoListar); //
evaluacionRouter.post('/listarEvaluacionesXCampania', evaluacionController.evaluacionesXCampañaListar); //
evaluacionRouter.post('/listarEvaluacionesXCampaniaXUsuario', evaluacionController.evaluacionesXCampañaXUsuarioListar); //
evaluacionRouter.get('/listarEvaluaciones', evaluacionController.evaluacionesListar);
evaluacionRouter.get('/listarSemanas', evaluacionController.semanasListar);
evaluacionRouter.get('/listarGravedades', evaluacionController.gravedadesListar);
evaluacionRouter.post('/listarPlagasActivas', evaluacionController.plagasActivasListar);
evaluacionRouter.post('/insertarEvaluacion', evaluacionController.evaluacionInsertar);
evaluacionRouter.post('/modificarEvaluacion', evaluacionController.evaluacionModificar);
evaluacionRouter.post('/eliminarEvaluacion', evaluacionController.evaluacionEliminar);

module.exports = evaluacionRouter;
