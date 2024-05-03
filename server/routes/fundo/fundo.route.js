var express = require('express');
var fundoRouter = express.Router();
var fundoController = require('../../controllers/fundo/fundo.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

fundoRouter.post('/getFundo', fundoController.fundoGet); //

module.exports = fundoRouter;
