const getConnection = require('../../config/database');
const Evaluacion = require('../../models/evaluacion/evaluacion.model');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');



exports.evaluacionesXSemanaListar = async (req, res) => {
    try {
    db.Evaluacion.listarEvaluacionesXSemana(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.evaluacionesXCampañaListar = async (req, res) => {
    try {
    db.Evaluacion.listarEvaluacionesXCampaña(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.evaluacionesLastXSemanaListar = async (req, res) => {
    try {
    db.Evaluacion.listarLastEvaluacionesXSemana(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.evaluacionesXCampañaXFundoListar = async (req, res) => {
    try {
    db.Evaluacion.listarEvaluacionesXCampañaXFundo(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.evaluacionesListar = async (req, res) => {
    try {
    db.Evaluacion.listarEvaluaciones(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.semanasListar = async (req, res) => {
    try {
    db.Evaluacion.listarSemanas(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.gravedadesListar = async (req, res) => {
    try {
    db.Evaluacion.listarGravedades(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.plagasActivasListar = async (req, res) => {
    try {
    db.Evaluacion.listarPlagasActivas(req,(err,data)=>{
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
                    Evaluacion: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Evaluacion: data,
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

exports.evaluacionInsertar = async (req, res) => {
    try {
            const evaluacion = new Evaluacion(1,req.body.descripcion, req.body.fecha, req.body.idCampañaXLote, req.body.semana, req.body.cantEncontrada, req.body.idPlaga, req.body.gravedad, req.body.idUsuario, req.body.idPerfil, 1);
            db.Evaluacion.insertarEvaluacion(evaluacion, (err, idEvaluacion) => {
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
                    idEvaluacion: idEvaluacion,
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

exports.evaluacionModificar = async (req, res) => {
    try {
            const evaluacion = new Evaluacion(req.body.idEvaluacion, req.body.descripcion, req.body.fecha, req.body.idCampañaXLote, req.body.semana, req.body.cantEncontrada, req.body.idPlaga, req.body.gravedad, req.body.idUsuario, req.body.idPerfil, 1);
            db.Evaluacion.modificarEvaluacion(evaluacion, (err, idEvaluacion) => {
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
                    idEvaluacion: idEvaluacion,
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

exports.evaluacionEliminar = async (req, res) => {
    try {
        const evaluacion = new Evaluacion(req.body.idEvaluacion);
        db.Evaluacion.eliminarEvaluacion(evaluacion, (err, results) => {
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
                idEvaluacion: results
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