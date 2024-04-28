const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Alumno = require('../../models/medicion/alumnos.model');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');

exports.alumnoMuestraInsertar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioCreacion = decoded.id;
        db.Alumnos.insertarAlumnoMuestra(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            res.json({
                success: true,
                idAlumno: data,
            });
        })

    }
    else {
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }


}

exports.alumnoListarAlmunoMuestra = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Alumnos.listarAlumnosMuestra(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            const { startIndex, endIndex } = req.pagination;
            const totalFilas = Object.keys(data).length;
            const totalPaginas = Math.ceil(Object.keys(data).length / 10);
            const alumnos = data.slice(startIndex, endIndex);
            res.json({
                success: true,
                Alumnos: alumnos,
                totalFilas: totalFilas,
                totalPaginas: totalPaginas
            });
        })
    }
    else {
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}


exports.alumnoInsertar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        var json = [];
        for (var i = 0; i < req.body.elementos.length; i++) {
            var objeto = {};
            objeto.fidMuestraMedicion = req.body.idMuestraMedicion;
            objeto.codigo = req.body.elementos[i].Codigo;
            objeto.nombre = req.body.elementos[i].Nombre;
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }
        console.log(json);
        db.Alumnos.insertarAlumno(json, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            res.json({
                success: true,
                idAlumno: data,
            });
        })

    }
    else {
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}

exports.alumnoEliminar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        var json = [];
        for (var i = 0; i < req.body.elementos.length; i++) {
            var objeto = {};
            objeto.fidMuestraMedicion = req.body.idMuestraMedicion;
            objeto.idAlumno = req.body.elementos[i].idAlumno;
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }
        console.log(json);
        db.Alumnos.alumnoEliminar(json, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            res.json({
                success: true,
                idAlumno: data,
            });
        })

    }
    else {
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}