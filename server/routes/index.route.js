var express = require('express');
var router = express.Router();
//Usuarios
var especialidadRouter = require('./usuario/especialidad.route');
var facultadRouter = require('./usuario/facultad.route');
var usuarioRouter = require('./usuario/usuario.route');
var perfilRouter = require('./usuario/perfil.route');
var autorizadorRouter = require('./usuario/autorizador.route');
var medicionRouter = require('./medicion/medicion.route');
var cicloAcademicoRouter = require('./medicion/cicloacademico.route');
var espacioMedicionRouter = require('./medicion/espaciomedicion.route');
var muestraMedicionRouter = require('./medicion/muestramedicion.route');
var competenciaRouter = require('./competencia/competencia.route');
var cuentaRouter = require('./cuenta/cuenta.route');
var indicadorRouter = require('./competencia/indicador.route');
var rubricaRouter = require('./competencia/rubrica.route');
const alumnosRouter = require('./medicion/alumnos.route');
const planMejoraRouter = require('./planMejora/planmejora.route');
const propuestaRouter = require('./planMejora/propuesta.route')
const actividadRouter = require('./planMejora/actividad.route')
const objetivoEducacionalRouter = require('./competencia/objetivoeducacional.route');
const reportesRouter = require('./combobox/reportes.route');

router.use('/medicion', medicionRouter);
router.use('/cicloAcademico', cicloAcademicoRouter);
router.use('/espacioMedicion', espacioMedicionRouter);
router.use('/muestraMedicion', muestraMedicionRouter);
router.use('/cuenta', cuentaRouter);
router.use('/alumno', alumnosRouter);
router.use('/planMejora', planMejoraRouter);
router.use('/propuesta', propuestaRouter);
router.use('/actividad', actividadRouter);
//
router.use('/especialidad', especialidadRouter);
router.use('/facultad', facultadRouter);
router.use('/usuario', usuarioRouter);
router.use('/perfil', perfilRouter);
router.use('/autorizador', autorizadorRouter);
//

router.use('/competencia', competenciaRouter);
router.use('/indicador', indicadorRouter);
router.use('/rubrica', rubricaRouter);
router.use('/objetivoEducacional', objetivoEducacionalRouter);
//
router.use('/combobox', reportesRouter);

module.exports = router;