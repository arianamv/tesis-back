const getConnection = require('../../config/database');
const Campaña = require('../../models/campaña/campaña.model');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');

exports.campañaListar = async (req, res) => {
    try {
    db.Campaña.listarCampaña(req,(err,data)=>{
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
                    Campaña: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Campaña: data,
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

exports.campañaXCultivoListar = async (req, res) => {
    try {
    db.Campaña.listarCampañaXCultivo(req,(err,data)=>{
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
                    Campaña: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Campaña: data,
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

exports.campañaXFundoListar = async (req, res) => {
    try {
    db.Campaña.listarCampañaXFundo(req,(err,data)=>{
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
                    Campaña: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Campaña: data,
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

exports.campañaXLoteGet = async (req, res) => {
    try {
    db.Campaña.getCampañaXLote(req,(err,data)=>{
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
                    Campaña: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Campaña: data,
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

exports.campañaInsertar = async (req, res) => {
    try {
            const campaña = new Campaña(1, req.body.nombre, req.body.descripcion, req.body.fechaIni, req.body.fechaFin, 1, req.body.cultivos);
            db.Campaña.insertarCampaña(campaña, (err, idCampaña) => {
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
                    idCampaña: idCampaña
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

    exports.campañaModificar = async (req, res) => {
        try {
                const campaña = new Campaña(req.body.idCampaña, req.body.nombre, req.body.descripcion, req.body.fechaIni, req.body.fechaFin, 1, req.body.cultivos);
                db.Campaña.modificarCampaña(campaña, (err, idCampaña) => {
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
                        idCampaña: idCampaña,
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

        exports.campañaEliminar = async (req, res) => {
            try {
                    const campaña = new Campaña(req.body.idCampaña);
                    db.Campaña.eliminarCampaña(campaña, (err, idCampaña) => {
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
                            idCampaña: idCampaña,
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