const getConnection = require('../../config/database');
const Aplicacion = require('../../models/aplicacion/aplicacion.model');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');

exports.aplicacionInsertar = async (req, res) => {
    try {
            const aplicacion = new Aplicacion(1, req.body.fecha, req.body.area, req.body.cantidadAplicada, req.body.unidadAplicada, req.body.semana, req.body.idCampañaXLote, req.body.idPesticida, 1);
            db.Aplicacion.insertarAplicacion(aplicacion, (err, idADP) => {
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
                    idADP: idADP,
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

exports.aplicacionModificar = async (req, res) => {
    try {
            const aplicacion = new Aplicacion(req.body.idADP, req.body.fecha, req.body.area, req.body.cantidadAplicada, req.body.unidadAplicada, req.body.semana, req.body.idCampañaXLote, req.body.idPesticida, req.body.estado);
            db.Aplicacion.modificarAplicacion(aplicacion, (err, idADP) => {
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
                    idADP: idADP,
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

exports.aplicacionEliminar = async (req, res) => {
    try {
            const aplicacion = new Aplicacion(req.body.idADP);
            db.Aplicacion.eliminarAplicacion(aplicacion, (err, idADP) => {
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
                    idADP: idADP,
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

exports.aplicacionesListar = async (req, res) => {
    try {
    db.Aplicacion.listarAplicaciones(req,(err,data)=>{
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
                    Aplicacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Aplicacion: data,
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

exports.aplicacionesXCampañaListar = async (req, res) => {
    try {
    db.Aplicacion.listarAplicacionesXCampaña(req,(err,data)=>{
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
                    Aplicacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Aplicacion: data,
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

exports.aplicacionesXCampañaXFundoListar = async (req, res) => {
    try {
    db.Aplicacion.listarAplicacionesXCampañaXFundo(req,(err,data)=>{
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
                    Aplicacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Aplicacion: data,
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
