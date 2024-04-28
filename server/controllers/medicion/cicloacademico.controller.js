const getConnection = require('../../config/database');
const db = require('../../models/index')
const jwt = require('jsonwebtoken');
const CicloAcademico = require('../../models/medicion/cicloacademico.model');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

exports.cicloAcademicoInsertar = (req, res) => {
    try {

    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        anio=parseInt(req.body.anio);
        semestre=parseInt(req.body.semestre);
        if (anio < 0) {
            console.log("iamin2")
            res.json({
                success: false,
                error: {
                    "message": "El año debe ser positivo"
                }
            });
            return;
        }
        if (req.body.anio.indexOf(".") != -1) {
            console.log("iamin3")
            res.json({
                success: false,
                error: {
                    "message": "El año debe ser entero"
                }
            });
            return;
        }
        if (req.body.semestre.indexOf(".") != -1) {
            console.log("iamin3")
            res.json({
                success: false,
                error: {
                    "message": "El semestre debe ser entero"
                }
            });
            return;
        }
        if (semestre < 0 || 2 < semestre) {
            console.log("entro2");
            res.json({
                success: false,
                error: {
                    "message": "El semestre debe ser mayor o igual a 0 y menor o igual a 2"
                }
            });
            return;
        }
        const cicloAcademico = new CicloAcademico(0, req.body.anio, req.body.semestre, req.body.anio.toString() + "-" + req.body.semestre.toString(), req.body.fechaInicio, req.body.fechaFin, 1, decoded.id, null, null);
        console.log(cicloAcademico);
        db.CicloAcademico.insertarCicloAcademico(cicloAcademico, (err, idCicloAcademico) => {
            if (err) {
                if (err.sqlState == 45000) {//Entrada repetida
                    res.json({
                        success: false,
                        error: {
                            "message": err.sqlMessage
                        }
                    });
                    return;
                }
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
                idCicloAcademico: idCicloAcademico
            });
        })
    }
    else {
        res.json({
            success: false,
            message: "No hay token enviado"
        });
        return;
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

exports.cicloAcademicoModificar = (req, res) => {
    try {

    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const cicloAcademico = new CicloAcademico(req.body.idCicloAcademico, req.body.anio, req.body.semestre, req.body.anio.toString() + req.body.semestre.toString(), req.body.fechaInicio, req.body.fechaFin, 1, null, decoded.id, null);
        db.CicloAcademico.modificarCicloAcademico(cicloAcademico, (err, idCicloAcademico) => {
            if (err) {
                if (err.sqlState == 45000) {//Entrada repetida
                    res.json({
                        success: false,
                        error: {
                            "message": err.sqlMessage
                        }
                    });
                    return;
                }
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
            });
        })
    }
    else {
        res.json({
            success: false,
            message: "No hay token enviado"
        });
        return;
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

exports.cicloAcademicoAnular = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioAnulacion = decoded.id;
        db.CicloAcademico.deshabilitarCicloAcademico(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log("Ciclo deshabilitado.");
            res.json({
                success: true,
            });
        });
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

exports.cicloAcademicoListar = async (req, res) => {
    try {

    db.CicloAcademico.listarCicloAcademicoTodos(req, (err, data) => {
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

exports.dupMedicionCicloAcademicoListar = async (req, res) => {
    try {
    db.CicloAcademico.listarCicloAcademicoDupMedicion(req, (err, data) => {
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

exports.cicloAcademicoListarPag = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.CicloAcademico.ListarCicloAcademicoDesdeHastaNombrePag(req, (err, data) => {
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
            const ciclosAcademicos = data.slice(startIndex, endIndex);
            res.json({
                success: true,
                Ciclo: ciclosAcademicos,
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
        return;
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

exports.cicloAcademicoListarDesde = async (req, res) => {
    try {

    db.CicloAcademico.listarCicloAcademicoDesde(req, (err, data) => {
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

exports.cicloAcademicoListarHasta = async (req, res) => {

    try {
    db.CicloAcademico.listarCicloAcademicoHasta(req, (err, data) => {
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

exports.cicloAcademicoListarDesdeHasta = async (req, res) => {

    try {
    db.CicloAcademico.listarCicloAcademicoDesdeHasta(req, (err, data) => {
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

