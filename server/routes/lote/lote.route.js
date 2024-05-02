var express = require('express');
var loteRouter = express.Router();
var loteController = require('../../controllers/lote/lote.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

loteRouter.get('/listarLote', loteController.loteListar); //

module.exports = loteRouter;
