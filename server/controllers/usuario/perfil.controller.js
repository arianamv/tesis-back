const perfil = require('../../models/usuario/perifl.model');
const getConnection = require('../../config/database');
const db = require('../../models/index')
const logger = require('../../config/winston');
const jwt = require('jsonwebtoken')
const correo = require('../../models/cuenta/correo.model')

exports.perfilInsertar = async (req, res) => {
    try {
    const connection = await getConnection.getConnection();
    var sql = "CALL InsertarPerfil(@result,?,?,?,?,?,@correo, @texto, @primerPerfil)";
    var value = [
        req.body.fidUsuario,
        req.body.fidResponsabilidad,
        req.body.esAsistente,
        req.body.nivelAcceso,
        req.body.usuarioCreacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            throw error;
        }
        connection.query('SELECT @result, @correo, @texto, @primerPerfil', (error, results) => {
            if (error) {
                throw error;
            }
            var texto = "Usted ha sido asignado como " + results[0]['@texto'] + ". \n \n Enlace a AcrediPUCP: https://acredita.inf.pucp.edu.pe/";
            if(results[0]['@primerPerfil'] == 1){
                texto = texto + '\n \n Si es su primera vez en el sistema registre su contraseña usando la opcion de ¿Olvido su contraseña?';
            }
            correo.enviarCorreo( results[0]['@correo'],"Nuevo rol en AcrediPUCP",texto);
            res.json({ results: results[0]['@result'] });
        });
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

exports.perfilListarRutas = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        db.User.listarPerfiles(decoded.id, (err, dataPerfil) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
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
                res.json({
                    success: true,
                    perfiles: dataPerfil,
                    usuario: dataUsuario
                });
            })

        })


    } else {
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


