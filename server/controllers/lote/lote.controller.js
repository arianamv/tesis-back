const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Lote = require('../../models/lote/lote.model');

exports.loteInsertar = async (req, res) => {
    try {
            const lote = new Lote(1, req.body.nombreLote, req.body.descripcion, req.body.tamanio, req.body.Fundo_idFundo, 1, req.body.campaña, req.body.coordenadas);
            db.Lote.insertarLote(lote, (err, idLote) => {
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
                    idLote: idLote
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

exports.loteModificar = async (req, res) => {
    try {
            const lote = new Lote(req.body.idLote, req.body.nombreLote, req.body.descripcion, req.body.tamanio, req.body.Fundo_idFundo, req.body.estado, req.body.campaña, req.body.coordenadas);
            db.Lote.modificarLote(lote, (err, idLote) => {
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
                    idLote: idLote
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

exports.loteEliminar = async (req, res) => {
    try {
            const lote = new Lote(req.body.idLote);
            db.Lote.eliminarLote(lote, (err, idLote) => {
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
                    idLote: idLote
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

exports.loteListar = async (req, res) => {
    try {
    db.Lote.listarLote(req,(err,data)=>{
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
                    Lote: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Lote: data,
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

exports.loteXFundoListar = async (req, res) => {
    try {
    db.Lote.listarLoteXFundo(req,(err,data)=>{
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
                    Lote: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Lote: data,
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

exports.loteXCampañaListar = async (req, res) => {
    try {
    db.Lote.listarLotesXCampaña(req,(err,data)=>{
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
                    Lote: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Lote: data,
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

exports.lotesCoordListar = async (req, res) => {
    try {
    db.Lote.listarLotesCoord(req,(err,data)=>{
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
                    Lote: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Lote: data,
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


exports.lotesXCampañaXFundoListar = async (req, res) => {
    try {
    db.Lote.listarLotesXCampañaXFundo(req,(err,data)=>{
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
                    Lote: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Lote: data,
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
