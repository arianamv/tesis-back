const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Plaga = require('../../models/plaga/plaga.model');

exports.plagaListar = async (req, res) => {
    try {
    db.Plaga.listarPlaga(req,(err,data)=>{
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
                    Plaga: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Plaga: data,
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


exports.plagaInsertar = async (req, res) => {
    try {
            const plaga = new Plaga(1,req.body.nombrePlaga, req.body.descripcion, req.body.nombreCientifico, req.body.familia, req.body.cantGrave, req.body.cantMedio, req.body.cantLeve, 1);
            db.Plaga.insertarPlaga(plaga, (err, idPlaga) => {
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
                    idPlaga: idPlaga,
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

exports.plagaModificar = async (req, res) => {
    try {
            const plaga = new Plaga(req.body.idPlaga, req.body.nombrePlaga, req.body.descripcion, req.body.nombreCientifico, req.body.familia, req.body.cantGrave, req.body.cantMedio, req.body.cantLeve, req.body.estado);
            db.Plaga.modificarPlaga(plaga, (err, idPlaga) => {
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
                    idPlaga: idPlaga,
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

    exports.plagaEliminar = async (req, res) => {
        try {
                const plaga = new Plaga(req.body.idPlaga);
                db.Plaga.eliminarPlaga(plaga, (err, idPlaga) => {
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
                        idPlaga: idPlaga,
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