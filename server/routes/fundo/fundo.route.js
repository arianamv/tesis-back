var express = require('express');
var fundoRouter = express.Router();
var fundoController = require('../../controllers/fundo/fundo.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

fundoRouter.post('/getFundo', fundoController.fundoGet); //
fundoRouter.get('/listarFundo', fundoController.fundoListar);
fundoRouter.post('/insertarFundo', fundoController.fundoInsertar); //
fundoRouter.post('/modificarFundo', fundoController.fundoModificar); //
fundoRouter.post('/eliminarFundo', fundoController.fundoEliminar); //

module.exports = fundoRouter;
