const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');

exports.listarCiclos = async (req, res) => {
    try {
    db.Reportes.listarCiclos((err, dataCiclos) => {
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
            data: dataCiclos,
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

exports.listarCursos = async (req, res) => {
    try {
    db.Reportes.listarCursos((err, dataCiclos) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        var cont = dataCiclos.length;
        var object = {
            id: cont + 1,
            curso: "TODOS"
        }
        dataCiclos.push(object);
        res.json({
            data: dataCiclos,
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

exports.listarCompetencias = async (req, res) => {
    try {
    db.Reportes.listarCompetencias((err, dataCiclos) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        var cont = dataCiclos.length;
        var object = {
            id: cont + 1,
            competencia: "TODOS"
        }
        dataCiclos.push(object);
        res.json({
            data: dataCiclos,
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

exports.ReplistarCursosXEspecialidad = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        const decoded = jwt.decode(token);
    db.Reportes.listarCursosXEspecialidad(req,(err, dataCiclos) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        var cont = dataCiclos.length;
        var object = {
            id: cont + 1,
            curso: "TODOS"
        }
        dataCiclos.push(object);
        res.json({
            data: dataCiclos,
        });
    });
    }
    else{
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

exports.listarCompetenciasXEspecialidad = async (req, res) => {
    try {
    db.Reportes.listarCompetenciasXEspecialidad(req,(err, dataCiclos) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        var cont = dataCiclos.length;
        var object = {
            id: cont + 1,
            competencia: "TODOS"
        }
        dataCiclos.push(object);
        res.json({
            data: dataCiclos,
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