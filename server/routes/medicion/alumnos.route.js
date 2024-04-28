var express = require('express');
var alumnosRouter = express.Router();
var passport = require('passport');
var pagination = require('../../middlewares/pagination')
var alumnosController = require('../../controllers/medicion/alumno.controller');

alumnosRouter.post('/insertarAlumno', passport.authenticate(['jwt'], { session: false }), alumnosController.alumnoInsertar);
alumnosRouter.post('/insertarAlumnoMuestra', passport.authenticate(['jwt'], { session: false }), alumnosController.alumnoMuestraInsertar);
alumnosRouter.post('/listarAlumnoMuestra', passport.authenticate(['jwt'], { session: false }), pagination(10), alumnosController.alumnoListarAlmunoMuestra);
alumnosRouter.post('/eliminarAlumno', passport.authenticate(['jwt'], { session: false }), alumnosController.alumnoEliminar);

module.exports = alumnosRouter;