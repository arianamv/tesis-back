const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');

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
