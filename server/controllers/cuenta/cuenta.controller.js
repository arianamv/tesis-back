const logger = require('../../config/winston');
const db = require('../../models/index')
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const jwt = require('jsonwebtoken');

exports.cuentaRecuperarContrasenia = (req, res) => {
    try {
    var rpta;
    //console.log(req.body.correo);
    db.Cuenta.recuperarContrasenia(req, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        if (data == null) {
            res.json({
                success: false,
                data: data
            });
            return;
        }
        res.json({
            success: true,
            data: data
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



exports.cuentaCambiarContrasenia = (req, res) => {
    try {
    db.Cuenta.cambiarContrasenia(req, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        if (data == null) {
            res.json({
                success: false,
            });
            return;
        }
        res.json({
            success: true
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


exports.usuarioModificar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        db.User.modificarUsuario2(req.body.idUsuario, req.body.correo2, req.body.celular, decoded.id, (err, dataUsusario) => {
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
                success: true
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