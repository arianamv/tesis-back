const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const logger  = require( '../../config/winston');



exports.usuarioListar = async (req, res) => {
    try {
    db.User.listarUsuario(req,(err,dataUsuario)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(dataUsuario);
            if(dataUsuario==null){
                res.json({
                    success: false,
                    Usuario: [],
                }); 
                return;
            }
            res.json({
                success: true,
                Usuario: dataUsuario,
            }); 
    }) 
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
