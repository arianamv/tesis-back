var express = require('express');
var loteRouter = express.Router();
var loteController = require('../../controllers/lote/lote.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

loteRouter.get('/listarLote', loteController.loteListar); //
loteRouter.post('/listarLotesCoord', loteController.lotesCoordListar);
loteRouter.post('/listarLoteXFundo', loteController.loteXFundoListar);

module.exports = loteRouter;
