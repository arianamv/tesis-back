const getConnection = require('../../config/database');
const logger = require('../../config/winston');
const jwt = require('jsonwebtoken');
const db = require('../../models/index')
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
var passport = require('passport');


exports.login = (req, res) => {
    try {
    var rpta;
    console.log(req.body.correo);
    db.User.verificarUsuario(req.body.correo, req.body.contrasenia, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        console.log("dat es " + JSON.stringify(data))
        if (data === 0) {
            res.json({
                success: false,
                error: {
                    "codigo": 1,
                    "message": "Usuario no existe en la Base de Datos"
                }
            });
            logger.log('error', 'El login fallo porque el usuario no existe');
        } else {
            if (data === 1) {
                res.json({
                    success: false,
                    error: {
                        "codigo": 2,
                        "message": "Se ingreso una contrasenia incorrecta"
                    }
                });
                logger.log('error', 'El login fallo porque el usuario ingreso una contrasenia incorrecta');
            } else {
                if (data === 3) {
                    res.json({
                        success: false,
                        error: {
                            "codigo": 3,
                            "message": "El usuario se encuentra inhabilitado"
                        }
                    });
                    logger.log('error', 'El login fallo porque el usuario ingreso una contrasenia incorrecta');
                } else {
                    db.User.buscarUsuarioXCorreo(req.body.correo, (err, dataUsuario) => {
                        if (err) {
                            res.json({
                                success: false,
                                error: {
                                    "message": err.message
                                }
                            });
                            return;
                        }
                        //console.log("Esta es la data usuario:" + JSON.stringify(dataUsuario[0]["idUsuario"]))
                        db.User.listarPerfiles(dataUsuario[0]["idUsuario"], (err, dataPerfiles) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    error: {
                                        "message": err.message
                                    }
                                });
                                return;
                            }
                            const token = jwt.sign({
                                id: dataUsuario[0]["idUsuario"],
                                email: req.body.correo
                            }, process.env.TOKEN_SECRET_KEY);
                            res.cookie('jwt', token)
                            res.json({
                                success: true
                            });
    
                        });
                    })
                }
                

            }
        }
    });

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