var express = require('express');
var campañaRouter = express.Router();
var campañaController = require('../../controllers/campaña/campaña.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

campañaRouter.get('/listarCampania', campañaController.campañaListar); //

module.exports = campañaRouter;
