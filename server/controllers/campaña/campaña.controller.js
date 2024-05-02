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
