var express = require('express');
var campañaRouter = express.Router();
var campañaController = require('../../controllers/campaña/campaña.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

campañaRouter.get('/listarCampania', campañaController.campañaListar); //
campañaRouter.get('/listarCampaniaXCultivo', campañaController.campañaXCultivoListar); //
campañaRouter.post('/insertarCampania', campañaController.campañaInsertar); //
campañaRouter.post('/insertarCampaniaXCultivo', campañaController.campañaXCultivoInsertar); //
campañaRouter.post('/modificarCampania', campañaController.campañaModificar); //
campañaRouter.post('/modificarCampaniaXCultivo', campañaController.campañaXCultivoModificar); //
campañaRouter.post('/eliminarCampania', campañaController.campañaEliminar); //
campañaRouter.post('/eliminarCampaniaXCultivo', campañaController.campañaXCultivoEliminar); //

module.exports = campañaRouter;
