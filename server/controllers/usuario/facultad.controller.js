const getConnection = require('../../config/database');
const db = require('../../models/index')
const jwt = require('jsonwebtoken');
const Facultad = require('../../models/usuario/facultad.model');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});;
const Perfil = require('../../models/usuario/perifl.model');


exports.facultadInsertar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const facultad = new Facultad(1, req.body.nombreFacultad, req.body.tieneEspecialidad, req.body.codigoFacultad, req.body.correo, 1, decoded.id, decoded.id, decoded.id);
        /*db.Facultad.insertarFacultad(facultad, (err, data) => {
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
                idFacultad: data
            });
        })*/
        try {
            const idFacultad = await new Promise((resolve, reject) => {
                db.Facultad.insertarFacultad(facultad, (err, idFacultad) => {
                    if (err) {
                        reject(err);
                    }
                    console.log("facultad insertada. idFacultad: " + idFacultad);
                    resolve(idFacultad);
                });
            });

            if(idFacultad > 0){
                
                for (let fidResUsuario of req.body.Responsables) {
                    console.log("Responsables:");
                    const perfilRes = new Perfil(1, fidResUsuario, idFacultad, 0, 0, 1, "", 1, decoded.id, decoded.id, decoded.id);
                    await new Promise((resolve, reject) => {
                        db.Perfil.insertarPerfil(perfilRes, (err, data) => {
                            if (err) {
                                reject(err);
                            }
                            console.log("Perfil responsable facultad insertado. idUsuario: " + perfilRes.fidUsuario);
                            resolve(data);
                        });
                    });
                }

                for (let fidAsisUsuario of req.body.Asistentes) {
                    console.log("Asistentes:");
                    const perfilAsistente = new Perfil(1, fidAsisUsuario, idFacultad, 1, 0, 1, "", 1, decoded.id, decoded.id, decoded.id);
                    await new Promise((resolve, reject) => {
                        db.Perfil.insertarPerfil(perfilAsistente, (err, data) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(data);
                            console.log("Perfil asistente facultad insertado. idUsuario: " + perfilAsistente.fidUsuario);
                        });
                    });
                }
            }

            res.json({
                success: true,
                idFacultad: idFacultad
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

exports.facultadDetalleMostrar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Facultad.mostrarDetalleFacultad(req, (err, data) => {
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
                Facultad: data
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

exports.facultadListar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Facultad.listarFacultad(req, (err, dataFacultad) => {
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
            const totalFilas = Object.keys(dataFacultad).length
            const totalPaginas = Math.ceil(Object.keys(dataFacultad).length / 10);
            const facultades = dataFacultad.slice(startIndex, endIndex);
            res.json({
                success: true,
                Facultad: facultades,
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

exports.facultadInsertarResponsables = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        let idFacultad = req.body.idFacultad;
        req.body.usuarioCreacion = decoded.id;
        for (let fidResUsuario of req.body.Responsables) {
            console.log("Responsable:");
            const perfilRes = new Perfil(1, fidResUsuario, idFacultad, 0, 0, 1, "", 1, decoded.id, decoded.id, decoded.id);
            await new Promise((resolve, reject) => {
                db.Perfil.insertarPerfil(perfilRes, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                    console.log("Perfil Responsable facultad insertado. idUsuario: " + perfilRes.fidUsuario);
                });
            });
        }
        res.json({
            success: true,
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

exports.facultadListarUsuarios = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Facultad.listarUsuariosQueNoSonFacultad(req, (err, data) => {
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
            const usuarios = data.slice(startIndex, endIndex);
            res.json({
                success: true,
                Usuario: usuarios,
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

exports.facultadDeshabilitarResponsable = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioAnulacion = decoded.id;
        db.Facultad.deshabilitarResponsable(req, (err, data) => {
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

exports.facultadModificar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioModificacion = decoded.id;
        db.Facultad.modificarFacultad(req, (err, data) => {
            if (err) {
                if(err.sqlState==45000){//Entrada repetida
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

exports.facultadListarRes = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Facultad.listarResFacultad(req, (err, data) => {
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
                Usuario: data
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

exports.facultadListarAsis = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Facultad.listarAsisFacultad(req, (err, data) => {
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
                Usuario: data
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

exports.facultadInsertarAsistentes = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        let idFacultad = req.body.idFacultad;
        req.body.usuarioCreacion = decoded.id;
        for (let fidAsisUsuario of req.body.Asistentes) {
            console.log("Asistentes:");
            const perfilAsistente = new Perfil(1, fidAsisUsuario, idFacultad, 1, 0, 1, "", 1, decoded.id, decoded.id, decoded.id);
            await new Promise((resolve, reject) => {
                db.Perfil.insertarPerfil(perfilAsistente, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                    console.log("Perfil asistente facultad insertado. idUsuario: " + perfilAsistente.fidUsuario);
                });
            });
        }
        res.json({
            success: true,
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

exports.facultadDeshabilitarPerfil = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioAnulacion = decoded.id;
        db.Perfil.deshabilitarPerfiles(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log("Perfil asistente facultad eliminado.");
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

exports.facultadReemplazarResponsable = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioModificacion = decoded.id;
        db.Perfil.reemplazarPerfil(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log("Perfil responsable facultad cambiado.");
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

exports.facultadHabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioModificacion = decoded.id;
        db.Facultad.habilitarFacultad(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log("Facultades habilitadas.");
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

exports.facultadDeshabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioAnulacion = decoded.id;
        db.Facultad.deshabilitarFacultad(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log("Facultad deshabilitada.");
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
