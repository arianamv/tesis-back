var express = require('express');
var pesticidaRouter = express.Router();
var pesticidaController = require('../../controllers/pesticida/pesticida.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

pesticidaRouter.get('/listarPesticida', pesticidaController.pesticidaListar); //

module.exports = pesticidaRouter;
