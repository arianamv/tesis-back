var express = require('express');
var muestraMedicionRouter = express.Router();

var muestraMedicionController = require('../../controllers/medicion/muestramedicion.controller');
var passport = require('passport');
var pagination = require('../../middlewares/pagination')

muestraMedicionRouter.post('/insertarMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionInsertar);

muestraMedicionRouter.get('/listarMuestraMedicionHistorico', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionListarHistorico);
muestraMedicionRouter.post('/listarMuestraMedicion', passport.authenticate(['jwt'], { session: false }), pagination(10), muestraMedicionController.muestraMedicionLista);
//muestraMedicionRouter.post('/enviarMuestraMedicion', passport.authenticate(['jwt'],{ session: false }), muestraMedicionController.muestraMedicionEnviar);

muestraMedicionRouter.post('/mostrarDetalleMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionDetalle);
muestraMedicionRouter.post('/listarIndicadoresMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionListarIndicadores);

muestraMedicionRouter.post('/listarCompetenciasMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionListarCompetencias);
muestraMedicionRouter.post('/listarIndicadoresCompetenciaMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionListarIndicadores2);

muestraMedicionRouter.post('/listarNombreCodigoMuestraMedicion', passport.authenticate(['jwt'], { session: false }), pagination(10), muestraMedicionController.muestraMedicionListarNombreCoidgo);

muestraMedicionRouter.post('/insertarAlumnoMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionInsertarAlumno);
muestraMedicionRouter.post('/listarAlumnoMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionListarAlumnos2);
muestraMedicionRouter.post('/insertarNotaAlumnoMuestraMedicion', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionInsertarNota2);


muestraMedicionRouter.post('/listarTodoIndicadoresMuestra', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionListarTodoIndicadores);

muestraMedicionRouter.post('/registrarIndicadoresMuestra', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionRegistrarResumenIndicador);
muestraMedicionRouter.post('/exportarResultadoGeneral', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.reportesResultadoGeneral);


muestraMedicionRouter.post('/enviarMuestraMedicion2', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionEnviar2);
muestraMedicionRouter.post('/listarEvidencia', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.listarEvidencias);
muestraMedicionRouter.post('/eliminarEvidencia', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.eliminarEvidencias);
muestraMedicionRouter.post('/descargarEvidencia', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.descargarEvidencia);

muestraMedicionRouter.post('/exportarSeguimientoMuestras', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.muestraMedicionReporteSeguimiento);
muestraMedicionRouter.post('/insertarMuestrasTodos', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.AgregarMuestraMedicionTodos);
muestraMedicionRouter.post('/eliminarMuestrasTodos', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.EliminarMuestrasMedicionTodos);
muestraMedicionRouter.post('/listarMuestraMedicionEspecialidad', passport.authenticate(['jwt'], { session: false }), pagination(10), muestraMedicionController.muestraMedicionListaEspecialidad);
muestraMedicionRouter.post('/modificarResponsable', passport.authenticate(['jwt'], { session: false }), muestraMedicionController.ModificarResponable);

module.exports = muestraMedicionRouter;