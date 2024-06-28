const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Pesticida = require('../../models/pesticida/pesticida.model');

exports.pesticidaInsertar = async (req, res) => {
    try {
            const pesticida = new Pesticida(1, req.body.nombrePeticida, req.body.descripcion, req.body.material, req.body.recomendaciones, req.body.metodoAplicacion, req.body.toxicidad, 1, req.body.plagas);
            db.Pesticida.insertarPesticida(pesticida, (err, idPesticida) => {
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
                    idPesticida: idPesticida
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

exports.pesticidaModificar = async (req, res) => {
    try {
            const pesticida = new Pesticida(req.body.idPesticida, req.body.nombrePeticida, req.body.descripcion, req.body.material, req.body.recomendaciones, req.body.metodoAplicacion, req.body.toxicidad, 1, req.body.plagas);
            db.Pesticida.modificarPesticida(pesticida, (err, idPesticida) => {
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
                    idPesticida: idPesticida
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

    exports.pesticidaEliminar = async (req, res) => {
        try {
                const pesticida = new Pesticida(req.body.idPesticida);
                db.Pesticida.eliminarPesticida(pesticida, (err, idPesticida) => {
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
                        idPesticida: idPesticida
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

exports.pesticidaListar = async (req, res) => {
    try {
    db.Pesticida.listarPesticida(req,(err,data)=>{
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
                    Pesticida: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Pesticida: data,
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

exports.pesticidaXPlagaListar = async (req, res) => {
    try {
    db.Pesticida.listarPesticidaXPlaga(req,(err,data)=>{
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
                    Pesticida: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Pesticida: data,
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

exports.metodosAplicacionListar = async (req, res) => {
    try {
    db.Pesticida.listarMetodosAplicacion(req,(err,data)=>{
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
                    Pesticida: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Pesticida: data,
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

exports.mejoresPesticidasListar = async (req, res) => {
    try {
    db.Pesticida.listarMejoresPesticidas(req,(err,data)=>{
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
                    Pesticida: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Pesticida: data,
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
