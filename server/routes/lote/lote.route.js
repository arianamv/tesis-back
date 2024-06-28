var express = require('express');
var loteRouter = express.Router();
var loteController = require('../../controllers/lote/lote.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

loteRouter.get('/listarLote', loteController.loteListar); //
loteRouter.post('/listarLotesCoord', loteController.lotesCoordListar);
loteRouter.post('/listarLoteXFundo', loteController.loteXFundoListar);
loteRouter.post('/listarLoteXCampania', loteController.loteXCampañaListar);
loteRouter.post('/listarLotesXCampaniaXFundo', loteController.lotesXCampañaXFundoListar);

loteRouter.post('/insertarLote', loteController.loteInsertar);
loteRouter.post('/modificarLote', loteController.loteModificar);
loteRouter.post('/eliminarLote', loteController.loteEliminar);

module.exports = loteRouter;
