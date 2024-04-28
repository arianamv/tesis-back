const logger = require('../../config/winston');
const db = require('../../models/index')
const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const Indicador = require('../../models/competencia/indicador.model');
const Rubrica = require('../../models/competencia/rubrica.model');
exports.indicadorInsertar = (req, res) => {
    try {
    var rpta;
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    //console.log(req.body.correo);
    if (token) {
        const decoded = jwt.decode(token);

        console.log(req.body)
        console.log("aca")
        const indicador = new Indicador(1, req.body.idCompetencia, req.body.descripcion, 4, 4, req.body.codigo, 1, decoded.id, decoded.id, decoded.id);
        db.Indicador.insertarIndicador(indicador, (err, idIndicador) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(idIndicador)
            for (var i = 0; i < req.body.Rubricas.length; i++) {
                //console.log(req.body.Indicadores[propiedad].codigo)
                var propiedad3 = req.body.Rubricas[i];
                const rubrica = new Rubrica(1, idIndicador, i + 1, propiedad3.descripcion, 1, decoded.id, decoded.id, decoded.id);
                db.Rubrica.insertarRubrica(rubrica, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            error: {
                                "message": err.message
                            }
                        });
                        return;
                    }
                })
            }
            res.json({
                success: true,
                idIndicador: idIndicador,
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

exports.indicadorModificar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    //console.log(req.body.correo);
    if (token) {
        const decoded = jwt.decode(token);
        const indicador = new Indicador(req.body.idIndicador, 1, req.body.descripcion, 4, 4, req.body.codigo, 1, decoded.id, decoded.id, decoded.id);
        db.Indicador.modificarIndicador(indicador, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            for (var i = 0; i < req.body.Rubricas.length; i++) {
                //console.log(req.body.Indicadores[propiedad].codigo)
                var propiedad3 = req.body.Rubricas[i];

                const rubrica = new Rubrica(propiedad3.idRubrica, 1, i + 1, propiedad3.descripcion, 1, decoded.id, decoded.id, decoded.id);
                db.Rubrica.modificarRubrica(rubrica, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            error: {
                                "message": err.message
                            }
                        });
                        return;
                    }
                })
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

exports.indicadorListarCompetencia = async (req, res) => {
    try {
    db.Indicador.listarIndicadorCompetencia(req, (err, data) => {
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
            Indicador: data
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


exports.indicadorEliminar = async (req, res) => {
    try {

    const authorizationHeader = req.headers['authorization'];
    var token;
    console.log("hola hola");
    console.log(req.body);

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        for (let propiedad in req.body) {
            console.log(propiedad);
            db.Indicador.eliminarIndicador(propiedad, decoded.id, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
            });
        }
        res.json({
            success: true
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
exports.ListarIndicadores = async (req, res) => {
    try {
    var json = [];
    // console.log("req");
    // console.log(req);
    if(req.body.elementos.length==0){
        let object={};
        object.idIndicador = 0;
        json.push(object);
    }
    for(let i=0; i<req.body.elementos.length;i++){
        let object={};
        object.idIndicador = req.body.elementos[i].idIndicador;
        json.push(object);
    }
    db.Indicador.listarIndicadorXCompetencia(req,json, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        const { startIndex, endIndex } = req.pagination;
        const totalFilas = Object.keys(data).length
        const totalPaginas = Math.ceil(Object.keys(data).length / 10);
        const indicadores = data.slice(startIndex, endIndex);
        res.json({
            success: true,
            indicador: indicadores,
            totalFilas: totalFilas,
            totalPaginas: totalPaginas
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
exports.AgregarIndicadoresTodos = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    console.log(req.body.indicadores.length);
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        var json = [];
        for (var i = 0; i < req.body.indicadores.length; i++) {
            var objeto = {};
            objeto.idEspacioMedicion = req.body.idEspacioMedicion;
            objeto.idIndicador = req.body.indicadores[i].idIndicador;
            objeto.evidencia = req.body.indicadores[i].evidencia;
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }
        console.log(json);
        db.Indicador.agregarIndicadoresTodos(json, (err, data) => {
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

exports.EliminarIndicadoresTodos = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        var json = [];
        for (var i = 0; i < req.body.elementos.length; i++) {
            var objeto = {};
            objeto.idEspacioMedicion = req.body.idEspacioMedicion;
            objeto.idIndicador = req.body.elementos[i].idIndicador;
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }
        console.log(json);
        db.Indicador.eliminarIndicadoresTodos(json, (err, data) => {
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
                idAlumno: data,
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


exports.ListarParametrosIndicador = async (req, res) => {
    try {
    db.Indicador.listarParametros(req, (err, data) => {
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
            parametros: data
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