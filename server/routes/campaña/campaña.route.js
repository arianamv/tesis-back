var express = require('express');
var campañaRouter = express.Router();
var campañaController = require('../../controllers/campaña/campaña.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

campañaRouter.get('/listarCampania', campañaController.campañaListar); //
campañaRouter.get('/listarCampaniaXCultivo', campañaController.campañaXCultivoListar); //
campañaRouter.post('/listarCampaniaXFundo', campañaController.campañaXFundoListar); //
campañaRouter.post('/insertarCampania', campañaController.campañaInsertar); //
campañaRouter.post('/modificarCampania', campañaController.campañaModificar); //
campañaRouter.post('/eliminarCampania', campañaController.campañaEliminar); //
campañaRouter.post('/getCampaniaXLote', campañaController.campañaXLoteGet); //

module.exports = campañaRouter;
