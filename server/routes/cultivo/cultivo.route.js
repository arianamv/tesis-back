var express = require('express');
var cultivoRouter = express.Router();
var cultivoController = require('../../controllers/cultivo/cultivo.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

cultivoRouter.get('/listarCultivo', cultivoController.cultivoListar); //

module.exports = cultivoRouter;
