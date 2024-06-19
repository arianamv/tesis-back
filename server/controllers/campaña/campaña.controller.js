const getConnection = require('../../config/database');
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

exports.campañaInsertar = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
    
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        }
        if (token) {
            const decoded = jwt.decode(token);
            const campaña = new Campaña(req.body.nombre, req.body.descripcion, req.body.fechaIni, req.body.fechaFin, 1);
            db.Campaña.insertarCampaña(campaña, (err, idCampaña) => {
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

exports.campañaXCultivoInsertar = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
    
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        }
        if (token) {
            const decoded = jwt.decode(token);
            const campaña = new Campaña(req.body.idCampaña, req.body.idCultivo, req.body.idVariedad, req.body.fechCosecha, 1);
            db.Campaña.insertarCampañaXCultivo(campaña, (err, idCampaña) => {
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

exports.campañaModificar = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
    
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        }
        if (token) {
            const decoded = jwt.decode(token);
            const campaña = new Campaña(req.body.idCampaña, req.body.nombre, req.body.descripcion, req.body.fechaIni, req.body.fechaFin, 1);
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

exports.campañaXCultivoModificar = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        var token;
    
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        }
        if (token) {
            const decoded = jwt.decode(token);
            const campaña = new Campaña(req.body.idCampañaXCultivo, req.body.idCampaña, req.body.idCultivo, req.body.idVariedad, req.body.fechCosecha, 1);
            db.Campaña.modificarCampañaXCultivo(campaña, (err, idCampaña) => {
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

exports.campañaEliminar = async (req, res) => {
    try {
    db.Campaña.eliminarCampaña(req,(err,data)=>{
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

exports.campañaXCultivoEliminar = async (req, res) => {
    try {
    db.Campaña.eliminarCampañaXCultivo(req,(err,data)=>{
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