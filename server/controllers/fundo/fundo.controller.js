const getConnection = require('../../config/database');
const Fundo = require('../../models/fundo/fundo.model');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');

exports.fundoInsertar = async (req, res) => {
    try {
            const fundo = new Fundo(1,req.body.nombreFundo, req.body.descripcion, req.body.totalHectareas, req.body.longitud, req.body.latitud, 1);
            db.Fundo.insertarFundo(fundo, (err, idFundo) => {
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
                    idFundo: idFundo,
                });
            })
        } catch (errorTRY) {
            res.json({
                success: false,
                error: {
                    "message": "Error en el servidor"
                },
                "message": "Error en el servidor"
            });
        }
}

exports.fundoModificar = async (req, res) => {
    try {
            const fundo = new Fundo(req.body.idFundo, req.body.nombreFundo, req.body.descripcion, req.body.totalHectareas, req.body.longitud, req.body.latitud, req.body.estado);
            db.Fundo.modificarFundo(fundo, (err, idFundo) => {
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
                   
                    idFundo: idFundo,
                });
            })
        } catch (errorTRY) {
            res.json({
                success: false,
                error: {
                    "message": "Error en el servidor"
                },
                "message": "Error en el servidor"
            });
        }
}

exports.fundoEliminar = async (req, res) => {
    try {
            const fundo = new Fundo(req.body.idFundo);
            db.Fundo.eliminarFundo(fundo, (err, idFundo) => {
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
                    idFundo: idFundo,
                });
            })
        } catch (errorTRY) {
            res.json({
                success: false,
                error: {
                    "message": "Error en el servidor"
                },
                "message": "Error en el servidor"
            });
        }
}

exports.fundoGet = async (req, res) => {
    try {
    db.Fundo.getFundo(req,(err,data)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(data);
            if(data==null){
                res.json({
                    success: false,
                    Fundo: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Fundo: data,
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

exports.fundoListar = async (req, res) => {
    try {
    db.Fundo.listarFundo(req,(err,data)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(data);
            if(data==null){
                res.json({
                    success: false,
                    Fundo: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Fundo: data,
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
