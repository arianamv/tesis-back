const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');



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