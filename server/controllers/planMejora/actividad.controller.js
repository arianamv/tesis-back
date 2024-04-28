const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Actividad = require('../../models/planMejora/actividad.model');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');

const { getSignUrlForFile, deleteObject } = require('../../config/S3');

exports.actividadListar = async (req, res) => {
    try {
    db.Actividad.listarActividad(req, (err, dataActividad) => {
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
        const totalFilas = Object.keys(dataActividad).length
        const totalPaginas = Math.ceil(Object.keys(dataActividad).length / 10);
        const actividad = dataActividad.slice(startIndex, endIndex);
        res.json({
            success: true,
            Actividad: actividad,
            totalFilas: totalFilas,
            totalPaginas: totalPaginas
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
// exports.actividadListarUnaActividad = async (req, res) => {
//     db.Actividad.listarActividad(req, (err, dataActividad) => {
//         if (err) {
//             res.json({
//                 success: false,
//                 error: {
//                     "message": err.message
//                 }
//             });
//             return;
//         }
//         res.json({
//             success: true,
//             data: dataActividad,
//         });
//     })
// }

exports.actividadListarUnaActividad = async (req, res) => {
    try {
    db.Actividad.listarActividad2(req, (err, dataActividad) => {
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
            data: dataActividad,
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



exports.actividadInsertar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const actividad = new Actividad(1, req.body.idPropuesta, req.body.codigo, req.body.descripcion, req.body.evidencia, req.body.responsable, 1, 1, decoded.id, decoded.id, decoded.id);
        db.Actividad.insertarActividad(actividad, (err, dataActividad) => {
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
exports.actividadModificar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const actividad = new Actividad(req.body.idActividad, 1, req.body.codigo, req.body.descripcion, req.body.evidencia, req.body.responsable, req.body.fidEstado, 1, decoded.id, decoded.id, decoded.id);
        db.Actividad.modificarActividad(actividad, (err, dataActividad) => {
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

exports.actividadEliminar = async (req, res) => {
    try {

    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        for (let propiedad in req.body) {
            console.log(propiedad);
            db.Actividad.eliminarActividad(propiedad, decoded.id, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
            });
        }
        res.json({
            success: true
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


exports.listarEvidencias = async (req, res) => {
    try {
    db.Actividad.listarEvidencias(req.body.idActividad, (err, data) => {
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


exports.eliminarEvidencias = async (req, res) => {
    try {
    const archivosExcel = req.body;
    console.log(archivosExcel)
    for (const archivo of archivosExcel) {
        console.log('Nombre del archivo:', archivo.name);
        db.Actividad.eliminarEvidencias(archivo.idDetalleEvidenciaActividad, archivo.fidActividad, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            deleteObject(archivo.token);
        });
    }
    res.json({
        success: true,
    });
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

exports.descargarEvidencia = async (req, res) => {
    try {
    const url = getSignUrlForFile(req.body.token);
    url.then(result => {
        res.json({
            success: true,
            archivo: result
        });
    }).catch(error => {
        console.error(error);
    });
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