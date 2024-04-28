var express = require('express');
var objetivoEducacionalRouter = express.Router();
var objetivoEducacionalController = require('../../controllers/competencia/objetivoeducacional.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

objetivoEducacionalRouter.post('/insertarObjetivoEducacional', passport.authenticate(['jwt'], { session: false }), objetivoEducacionalController.objetivoEducacionalInsertar);
objetivoEducacionalRouter.post('/anularObjetivoEducacional', passport.authenticate(['jwt'], { session: false }), objetivoEducacionalController.objetivoEducacionalDeshabilitar);
objetivoEducacionalRouter.post('/modificarObjetivoEducacional', passport.authenticate(['jwt'], { session: false }), objetivoEducacionalController.objetivoEducacionalModificar);
objetivoEducacionalRouter.post('/listarHistoricoObjetivoEducacional', passport.authenticate(['jwt'], { session: false }), pagination(10), objetivoEducacionalController.objetivoEducacionalListarHistorico);
objetivoEducacionalRouter.post('/listarActivosObjetivoEducacional', passport.authenticate(['jwt'], { session: false }), pagination(10), objetivoEducacionalController.objetivoEducacionalListarActivos);
objetivoEducacionalRouter.post('/exportarObjetivoEducacional', passport.authenticate(['jwt'], { session: false }), objetivoEducacionalController.objetivosEducacionalesReporte);

module.exports = objetivoEducacionalRouter;
