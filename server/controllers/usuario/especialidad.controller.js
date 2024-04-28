const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const logger = require('../../config/winston');
const Especialidad = require('../../models/usuario/especialidad.model');
const Perfil = require('../../models/usuario/perifl.model');

exports.especialidadInsertar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        const decoded = jwt.decode(token);

        const especialidad = new Especialidad(1, req.body.fidFacultad, req.body.nombreEspecialidad, req.body.correo, req.body.codigoEspecialidad, 1, decoded.id, decoded.id, decoded.id);

        try {
            const idEspecialidad = await new Promise((resolve, reject) => {
                db.Especialidad.insertarEspecialidad(especialidad, (err, idEspecialidad) => {
                    if (err) {
                        reject(err);
                    }
                    console.log("Especialidad insertada. idEspecialidad: " + idEspecialidad);
                    resolve(idEspecialidad);
                });
            });
            if (idEspecialidad > 0) {

                for (let fidResUsuario of req.body.Responsables) {
                    console.log("Responsables:");
                    const perfilRes = new Perfil(1, fidResUsuario, idEspecialidad, 0, 0, 2, "", 1, decoded.id, decoded.id, decoded.id);
                    await new Promise((resolve, reject) => {
                        db.Perfil.insertarPerfil(perfilRes, (err, data) => {
                            if (err) {
                                reject(err);
                            }
                            console.log("Perfil responsable especialidad insertado. idUsuario: " + perfilRes.fidUsuario);
                            resolve(data);
                        });
                    });
                }

                for (let fidAsisUsuario of req.body.Asistentes) {
                    console.log("Asistentes:");
                    const perfilAsistente = new Perfil(1, fidAsisUsuario, idEspecialidad, 1, 0, 2, "", 1, decoded.id, decoded.id, decoded.id);
                    await new Promise((resolve, reject) => {
                        db.Perfil.insertarPerfil(perfilAsistente, (err, data) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(data);
                            console.log("Perfil asistente especialidad insertado. idUsuario: " + perfilAsistente.fidUsuario);
                        });
                    });
                }
            }
            res.json({
                success: true,
                idEspecialidad: idEspecialidad
            });
        } catch (error) {
            res.json({
                success: false,
                error: {
                    "message": error.message
                }
            });
        }
    } else {
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

exports.especialidadListar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        db.Especialidad.listarEspecialidad(req, (err, data) => {
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
            console.log(typeof data)
            const totalFilas = Object.keys(data).length;
            const totalPaginas = Math.ceil(Object.keys(data).length / 10);
            const especialidades = data.slice(startIndex, endIndex);
            res.json({
                success: true,
                Especialidad: especialidades,
                totalFilas: totalFilas,
                totalPaginas: totalPaginas
            });
        })
    } else {
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

exports.especialidadListarUsuarios = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Especialidad.listarUsuariosNoDeEspecialidad(req, (err, data) => {
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

exports.especialidadDeshabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        for (let propiedad of req.body.Especialidades) {
            db.Especialidad.deshabilitarEspecialidad(propiedad, decoded.id, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
            })
        }
        res.json({
            success: true
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

exports.especialidadDetalleMostrar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        db.Especialidad.mostrarDetalleEspecialidad(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message,
                        "fallo": "error al obtener especialidad"
                    }
                });
                return;
            }
            res.json({
                success: true,
                Especialidad: data
            });
        });
    } else {
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

exports.especialidadActualizarParametros = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioCreacion = decoded.id;
        db.Especialidad.actualizarParametro(req, (err, data) => {
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

exports.especialidadListarXFacultad = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        db.Especialidad.listarEspecialidadXFacultad(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message,
                        "fallo": "error al obtener especialidad"
                    }
                });
                return;
            }
            res.json({
                success: true,
                data: data
            });
        });
    } else {
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

exports.especialidadListarRes = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Especialidad.listarResEspecialidad(req, (err, data) => {
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

exports.especialidadListarAsis = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        db.Especialidad.listarAsisEspecialidad(req, (err, data) => {
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

exports.especialidadInsertarResponsables = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        let idEspecialidad = req.body.idEspecialidad;
        req.body.usuarioCreacion = decoded.id;
        for (let fidResUsuario of req.body.Responsables) {
            console.log("Responsables");
            const perfilRes = new Perfil(1, fidResUsuario, idEspecialidad, 0, 0, 2, "", 1, decoded.id, decoded.id, decoded.id);
            await new Promise((resolve, reject) => {
                db.Perfil.insertarPerfil(perfilRes, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    console.log("Perfil responsable especialidad insertado. idUsuario: " + perfilRes.fidUsuario);
                    resolve(data);
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


exports.especialidadModificar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioModificacion = decoded.id;
        db.Especialidad.modificarEspecialidad(req, (err, data) => {
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
                exito: data
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


exports.especialidadReactivar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioModificacion = decoded.id;
        db.Especialidad.ReactivarEspecialidad(req, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log("Especialidades habilitadas.");
            res.json({
                success: true
            });
        })
    } else {
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

exports.especialidadInsertarAsistentes = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        let idEspecialidad = req.body.idEspecialidad;
        req.body.usuarioCreacion = decoded.id;
        for (let fidAsisUsuario of req.body.Asistentes) {
            console.log("Asistentes:");
            const perfilAsistente = new Perfil(1, fidAsisUsuario, idEspecialidad, 1, 0, 2, "", 1, decoded.id, decoded.id, decoded.id);
            await new Promise((resolve, reject) => {
                db.Perfil.insertarPerfil(perfilAsistente, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                    console.log("Perfil asistente especialidad insertado. idUsuario: " + perfilAsistente.fidUsuario);
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

exports.especialidadDeshabilitarPerfil = async (req, res) => {
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
            console.log("Perfil asistente especialidad eliminado.");
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

exports.especialidadReemplazarResponsable = async (req, res) => {
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
            console.log("Perfil responsable especialidad cambiado.");
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


exports.verificarParametrosExistentes = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);

        db.Especialidad.verificarParametrosExistentes(req, (err, dataCompetencia) => {
            if (err) {
                if(err.sqlState==45000){
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
                success: true
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