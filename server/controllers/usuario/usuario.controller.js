const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/usuario/usuario.model');

exports.usuarioInsertar = async (req, res) => {
    try {
            const usuario = new Usuario(1, req.body.nombres, req.body.apellidoPat, req.body.apellidoMat, req.body.dni, req.body.email, req.body.telefono, req.body.contrasenia, req.body.Perfil_idPerfil, 1, req.body.fundos);
            db.User.insertarUsuario(usuario, (err, idUsuario) => {
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            message: err.message
                        }
                    });
                    return;
                }
                res.json({
                    success: true,
                    idUsuario: idUsuario
                });
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                error: {
                    message: "Error en el servidor"
                }
            });
        }
    
    }

exports.usuarioModificar = async (req, res) => {
    try {
            const usuario = new Usuario(req.body.idUsuario, req.body.nombres, req.body.apellidoPat, req.body.apellidoMat, req.body.dni, req.body.email, req.body.telefono, req.body.contrasenia, req.body.Perfil_idPerfil, req.body.estado, req.body.fundos);
            db.User.modificarUsuario(usuario, (err, idUsuario) => {
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            message: err.message
                        }
                    });
                    return;
                }
                res.json({
                    success: true,
                    idUsuario: idUsuario
                });
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                error: {
                    message: "Error en el servidor"
                }
            });
        }
    
    }

    exports.usuarioEliminar = async (req, res) => {
        try {
                const usuario = new Usuario(req.body.idUsuario);
                db.User.eliminarUsuario(usuario, (err, idUsuario) => {
                    if (err) {
                        res.json({
                            success: false,
                            error: {
                                message: err.message
                            }
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        idUsuario: idUsuario
                    });
                });
            } catch (error) {
                console.log(error);
                res.json({
                    success: false,
                    error: {
                        message: "Error en el servidor"
                    }
                });
            }
        
        }

exports.usuarioListar = async (req, res) => {
    try {
    db.User.listarUsuario(req,(err,dataUsuario)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(dataUsuario);
            if(dataUsuario==null){
                res.json({
                    success: false,
                    Usuario: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Usuario: dataUsuario,
            }); 
    }) 
    } catch (errorTRY) {
        console.log(errorTRY)
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}

exports.evaluadoresListar = async (req, res) => {
    try {
    db.User.listarEvaluadores(req,(err,dataUsuario)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(dataUsuario);
            if(dataUsuario==null){
                res.json({
                    success: false,
                    Usuario: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Usuario: dataUsuario,
            }); 
    }) 
    } catch (errorTRY) {
        console.log(errorTRY)
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}

exports.usuariosXFundoListar = async (req, res) => {
    try {
    db.User.listarUsuarioXFundo(req,(err,dataUsuario)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(dataUsuario);
            if(dataUsuario==null){
                res.json({
                    success: false,
                    Usuario: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Usuario: dataUsuario,
            }); 
    }) 
    } catch (errorTRY) {
        console.log(errorTRY)
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}
