const logger = require('../config/winston');
const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../.env.production' 
          : __dirname + '/../.env.development'
});
const db = require('../models/index')


function autenticadorJWT(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    //console.log("Este es el token recibido "+token)
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                logger.log('info', 'Usuario no autorizado para realizar la consulta');
                res.json({
                    success: false,
                    error: {
                        "message": "Usuario no autorizado para realizar la consulta"
                    }
                });
            } else {
                db.User.buscarUsuarioXCorreo(decoded.email, (err, dataUsuario) => {
                    if (err) {
                        res.json({
                            success: false,
                            error: {
                                "message": err.message
                            }
                        });
                        return;
                    }

                    console.log("Este es la data del usuario " + dataUsuario)
                    if (Object.keys(dataUsuario).length === 0) {
                        logger.log('error', 'Usuario no existe en la Base de Datos');
                        res.json({
                            success: false,
                            error: {
                                "codigo": 1,
                                "message": "Usuario no existe en la Base de Datos"
                            }
                        });
                    } else {
                        //req.currentUser = user;
                        next();
                    }
                })

            }
        });
    } else {
        logger.log('info', 'No se envio ningun token');
        res.json({
            success: false,
            error: {
                "message": "No se envio ningun token"
            }
        });
    }
};
module.exports = autenticadorJWT;