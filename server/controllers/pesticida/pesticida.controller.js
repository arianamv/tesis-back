const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');

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
