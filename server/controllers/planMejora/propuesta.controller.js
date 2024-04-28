const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Propuesta = require('../../models/planMejora/propuesta.model');
const Actividad = require('../../models/planMejora/actividad.model');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');


exports.propuestaListar = async (req, res) => {
    try {
    db.Propuesta.listarPropuesta(req, (err, dataPropuesta) => {
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
        const totalFilas = Object.keys(dataPropuesta).length
        const totalPaginas = Math.ceil(Object.keys(dataPropuesta).length / 10);
        const propuesta = dataPropuesta.slice(startIndex, endIndex);
        res.json({
            success: true,
            Propuesta: propuesta,
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



exports.propuestaModificar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const propuesta = new Propuesta(req.body.idPropuesta, 1, req.body.codigo, req.body.descripcion, 1, decoded.id, decoded.id, decoded.id);
        db.Propuesta.modificarPropuesta(propuesta, (err, dataPlanMejora) => {
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

exports.propuestaInsertar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    console.log("laacassasdasdasdadasssssss")
    if (token) {
        const decoded = jwt.decode(token);
        const propuesta = new Propuesta(1, req.body.idPlanMejora, req.body.codigo, req.body.descripcion, 1, decoded.id, decoded.id, decoded.id);
        try {
            const idPropuesta = await new Promise((resolve, reject) => {
                db.Propuesta.insertarPropuesta(propuesta, (err, idPropuesta) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(idPropuesta);
                    }
                });
            });
            for (let propiedad of req.body.Actividades) {
                //console.log(req.body.Indicadores[propiedad].codigo)
                var propiedad2 = propiedad;
                const actividad = new Actividad(1, idPropuesta, propiedad2.codigo, propiedad2.descripcion, propiedad2.evidencia, propiedad2.responsable, 1, 1, decoded.id, decoded.id, decoded.id);
                await new Promise((resolve, reject) => {
                    db.Actividad.insertarActividad(actividad, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
            }
            res.json({
                success: true
            });
        } catch (error) {
            res.json({
                success: false,
                error: {
                    "message": error.message
                }
            });
        }
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


exports.propuestaEliminar = async (req, res) => {
    try {

    const authorizationHeader = req.headers['authorization'];
    var token;
    console.log("hola hola");
    console.log(req.body);

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        for (let propiedad in req.body) {
            console.log(propiedad);
            db.Propuesta.eliminarPropuesta(propiedad, decoded.id, (err, data) => {
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

// exports.propuestaInsertar = async (req, res) => {
//     const authorizationHeader = req.headers['authorization'];
//     var token;

//     if (authorizationHeader) {
//         token = authorizationHeader.split(' ')[1];
//     }
//     if (token) {
//         const decoded = jwt.decode(token);
//         const propuesta = new Propuesta(req.body.idPropuesta, 1, propiedad2.codigo, propiedad2.descripcion, 1, decoded.id, decoded.id, decoded.id);
//         db.Propuesta.modificarPropuesta(propuesta, (err, dataPlanMejora) => {
//             if (err) {
//                 res.json({
//                     success: false,
//                     error: {
//                         "message": err.message
//                     }
//                 });
//                 return;
//             }
//             res.json({
//                 success: true,
//             });
//         })
//     }
//     else {
//         res.json({
//             success: false,
//             message: "No hay token enviado"
//         });
//     }
// }