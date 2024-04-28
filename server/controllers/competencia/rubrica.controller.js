const logger = require('../../config/winston');
const db = require('../../models/index')
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

exports.rubricaInsertar = (req, res) => {
    try {
    var rpta;
    //console.log(req.body.correo);
    db.Rubrica.insertarRubrica(req.body, (err, data) => {
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

exports.rubricaListarIndicador = (req, res) => {
    try {
    var rpta;
    //console.log(req.body.correo);
    db.Rubrica.listarRubrica(req.body.fidIndicador, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }

        db.Indicador.detalleIndicador(req, (err, descripcionIndicador) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message,
                        "fallo": "error al obtener descripcion de indicador"
                    }
                });
                return;
            }
            // agrego la nueva data
            data[data.length] = descripcionIndicador[0];
            //console.log("los datos despues de agregar indicadores")
            //console.log(data2)
            res.json({
                success: true,
                data: data
            });
        })
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

