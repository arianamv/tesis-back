const logger = require('../../config/winston');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

exports.espacioMedicionInsertar = (req, res) => {
    try {
    var rpta;
    //console.log(req.body.correo);
    db.EspacioMedicion.insertarEspacioMedicion(req, (err, data) => {
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
            success: true
        });
    })
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

exports.EspacioMedicionListar = async (req, res) => {
    try {
    db.EspacioMedicion.listarEspacioMedicion(req, (err, data) => {
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
            data: data
        });
    })
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

exports.EspacioMedicionListarNombreCurso = async (req, res) => {
    try {
    db.EspacioMedicion.listarEspacioMedicionNombreCurso(req, (err, data) => {
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
            data: data
        });
    })
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

exports.ListarEspacioMedicionDeUnaMuestra = async (req, res) => {
    try {
    db.EspacioMedicion.ListarEspaciosUnaMedicion(req, (err, data) => {
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
            Espacio: data
        });
    })
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

exports.EspacioMedicionListarMuestras = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.EspacioMedicion.listarEspacioMedicionMuestras(req, (err, data) => {
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
                data: data
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

exports.EspacioMedicionListarIndicadores = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    console.log("HOLAAAAAAAAAAAAAAAAAAA");
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.EspacioMedicion.listarEspacioMedicionIndicadores(req, (err, data) => {
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
                data: data
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
exports.AnadirEspacio = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        var json = [];
        if (req.body.MuestrasMedicion.length == 0 && req.body.Indicadores.length == 0 ) {
            var objeto = {};
            objeto.idMedicion = req.body.idMedicion;
            objeto.codigo = req.body.codigoEspacio;
            objeto.nombreCurso = req.body.nombreCurso;
            objeto.fechaLimite = req.body.fechaLimite;
            objeto.tipoMedicion = req.body.tipoMedicion;
            objeto.periodo = req.body.cicloAcademico;
            objeto.horario = "";
            objeto.codDocente = "";
            objeto.fidIndicador = "";
            objeto.evidencia = "";
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }

        if (req.body.MuestrasMedicion.length != 0 && req.body.Indicadores.length != 0 ) {
            for (var j = 0; j < req.body.MuestrasMedicion.length; j++) {
                for (var k = 0; k < req.body.Indicadores.length; k++) {
                    var objeto = {};
                    objeto.idMedicion = req.body.idMedicion;
                    objeto.codigo = req.body.codigoEspacio;
                    objeto.nombreCurso = req.body.nombreCurso;
                    objeto.fechaLimite = req.body.fechaLimite;
                    objeto.tipoMedicion = req.body.tipoMedicion;
                    objeto.periodo = req.body.cicloAcademico;
                    objeto.horario = req.body.MuestrasMedicion[j].codigo;
                    objeto.codDocente = req.body.MuestrasMedicion[j].codigoResponsable;
                    objeto.fidIndicador = req.body.Indicadores[k].idIndicador;
                    objeto.evidencia = req.body.Indicadores[k].evidencia;
                    objeto.idUsuarioCreacion = decoded.id;
                    json.push(objeto);
                }
            }
        }

        if (req.body.MuestrasMedicion.length == 0) {
            for (var k = 0; k < req.body.Indicadores.length; k++) {
                var objeto = {};
                objeto.idMedicion = req.body.idMedicion;
                objeto.codigo = req.body.codigoEspacio;
                objeto.nombreCurso = req.body.nombreCurso;
                objeto.fechaLimite = req.body.fechaLimite;
                objeto.tipoMedicion = req.body.tipoMedicion;
                objeto.periodo = req.body.cicloAcademico;
                objeto.horario = "";
                objeto.codDocente = "";
                objeto.fidIndicador = req.body.Indicadores[k].idIndicador;
                objeto.evidencia = req.body.Indicadores[k].evidencia;
                objeto.idUsuarioCreacion = decoded.id;
                json.push(objeto);
            }
        }

        if (req.body.Indicadores.length == 0) {
            for (var j = 0; j < req.body.MuestrasMedicion.length; j++) {
                var objeto = {};
                objeto.idMedicion = req.body.idMedicion;
                objeto.codigo = req.body.codigoEspacio;
                objeto.nombreCurso = req.body.nombreCurso;
                objeto.fechaLimite = req.body.fechaLimite;
                objeto.tipoMedicion = req.body.tipoMedicion;
                objeto.periodo = req.body.cicloAcademico;
                objeto.horario = req.body.MuestrasMedicion[j].codigo;
                objeto.codDocente = req.body.MuestrasMedicion[j].codigoResponsable;
                objeto.fidIndicador = "";
                objeto.evidencia = "";
                objeto.idUsuarioCreacion = decoded.id;
                json.push(objeto);
            }
        }

        console.log(json);
        console.log("SUEÑOOOOOOOOOOOOOOOO");
        db.EspacioMedicion.anadirEspacio(json, (err, data) => {
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
                datos: data
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
exports.EliminarEspacio = (req, res) => {
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
            objeto.idMedicion = req.body.idMedicion;
            objeto.idEspacioMedicion = req.body.elementos[i].idEspacioMedicion;
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }
        console.log(json);
        db.EspacioMedicion.eliminarEspacio(json, (err, data) => {
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

exports.ModificarEspacio = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.idUsuarioCreacion = decoded.id;
        db.EspacioMedicion.modificarEspacio(req, (err, data) => {
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
                datos: data
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