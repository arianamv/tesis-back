const logger = require('../../config/winston');
const jwt = require('jsonwebtoken');
const db = require('../../models/index')
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const xl = require('excel4node');
const { Blob } = require('buffer');
const Medicion = require('../../models/medicion/medicion.model');
const EspacioMedicion = require('../../models/medicion/espaciomedicion.model');
const MuestraMedicion = require('../../models/medicion/muestramedicion.model');

exports.medicionInsertar = (req, res) => {
    try {
    var rpta;
    //console.log(req.body.correo);
    db.Medicion.insertarMedicion(req, (err, data) => {
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
exports.medicionInsertar2 = async (req, res) => {
    try {
    //agregar idcreacion
    //agregar idindicadores

    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        var json = [];
        var json2 = {};
        json2.nombreCurso = [];
        json2.codDocente = [];
        json2.horario = [];

        for (var j = 0; j < req.body.EspaciosMedicion.length; j++) {
            for (var k = 0; k < req.body.EspaciosMedicion[j].MuestrasMedicion.length; k++) {
                //armo el json
                json2.nombreCurso.push(req.body.EspaciosMedicion[j].nombreCurso);
                json2.codDocente.push(req.body.EspaciosMedicion[j].MuestrasMedicion[k].codigoResponsable);
                json2.horario.push(req.body.EspaciosMedicion[j].MuestrasMedicion[k].codigo);
            }
        }

        if (req.body.EspaciosMedicion.length == 0) {
            var objeto = {};
            objeto.fidEspecialidad = req.body.fidEspecialidad;
            objeto.codigoMedicion = req.body.codigoMedicion;
            objeto.cicloInicio = req.body.cicloInicio;
            objeto.cicloFin = req.body.cicloFin;
            objeto.codigo = "";
            objeto.nombreCurso = "";
            objeto.fechaLimite = "";
            objeto.tipoMedicion = "";
            objeto.periodo = "";
            objeto.horario = "";
            objeto.codDocente = "";
            objeto.fidIndicador = "";
            objeto.evidencia = "";
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }
        for (var i = 0; i < req.body.EspaciosMedicion.length; i++) {
            if (req.body.EspaciosMedicion[i].MuestrasMedicion.length == 0 && req.body.EspaciosMedicion[i].Indicadores.length == 0) {
                var objeto = {};
                objeto.fidEspecialidad = req.body.fidEspecialidad;
                objeto.codigoMedicion = req.body.codigoMedicion;
                objeto.cicloInicio = req.body.cicloInicio;
                objeto.cicloFin = req.body.cicloFin;
                objeto.codigo = req.body.EspaciosMedicion[i].codigoEspacio;
                objeto.nombreCurso = req.body.EspaciosMedicion[i].nombreCurso;
                objeto.fechaLimite = req.body.EspaciosMedicion[i].fechaLimite;
                objeto.tipoMedicion = req.body.EspaciosMedicion[i].tipoMedicion;
                objeto.periodo = req.body.EspaciosMedicion[i].cicloAcademico;
                objeto.horario = "";
                objeto.codDocente = "";
                objeto.fidIndicador = "";
                objeto.evidencai = "";
                objeto.idUsuarioCreacion = decoded.id;
                json.push(objeto);
            }
            else {
                if (req.body.EspaciosMedicion[i].MuestrasMedicion.length != 0 && req.body.EspaciosMedicion[i].Indicadores.length != 0) {
                    for (var j = 0; j < req.body.EspaciosMedicion[i].MuestrasMedicion.length; j++) {
                        for (var k = 0; k < req.body.EspaciosMedicion[i].Indicadores.length; k++) {
                            var objeto = {};
                            objeto.fidEspecialidad = req.body.fidEspecialidad;
                            objeto.codigoMedicion = req.body.codigoMedicion;
                            objeto.cicloInicio = req.body.cicloInicio;
                            objeto.cicloFin = req.body.cicloFin;
                            objeto.codigo = req.body.EspaciosMedicion[i].codigoEspacio;
                            objeto.nombreCurso = req.body.EspaciosMedicion[i].nombreCurso;
                            objeto.fechaLimite = req.body.EspaciosMedicion[i].fechaLimite;
                            objeto.tipoMedicion = req.body.EspaciosMedicion[i].tipoMedicion;
                            objeto.periodo = req.body.EspaciosMedicion[i].cicloAcademico;
                            objeto.horario = req.body.EspaciosMedicion[i].MuestrasMedicion[j].codigo;
                            objeto.codDocente = req.body.EspaciosMedicion[i].MuestrasMedicion[j].codigoResponsable;
                            objeto.fidIndicador = req.body.EspaciosMedicion[i].Indicadores[k].idIndicador;
                            objeto.evidencia = req.body.EspaciosMedicion[i].Indicadores[k].evidencia;
                            objeto.idUsuarioCreacion = decoded.id;
                            json.push(objeto);
                        }
                    }
                }

                if (req.body.EspaciosMedicion[i].MuestrasMedicion.length == 0) {
                    for (var k = 0; k < req.body.EspaciosMedicion[i].Indicadores.length; k++) {
                        var objeto = {};
                        objeto.fidEspecialidad = req.body.fidEspecialidad;
                        objeto.codigoMedicion = req.body.codigoMedicion;
                        objeto.cicloInicio = req.body.cicloInicio;
                        objeto.cicloFin = req.body.cicloFin;
                        objeto.codigo = req.body.EspaciosMedicion[i].codigoEspacio;
                        objeto.nombreCurso = req.body.EspaciosMedicion[i].nombreCurso;
                        objeto.fechaLimite = req.body.EspaciosMedicion[i].fechaLimite;
                        objeto.tipoMedicion = req.body.EspaciosMedicion[i].tipoMedicion;
                        objeto.periodo = req.body.EspaciosMedicion[i].cicloAcademico;
                        objeto.horario = "";
                        objeto.codDocente = "";
                        objeto.fidIndicador = req.body.EspaciosMedicion[i].Indicadores[k].idIndicador;
                        objeto.evidencia = req.body.EspaciosMedicion[i].Indicadores[k].evidencia;
                        objeto.idUsuarioCreacion = decoded.id;
                        json.push(objeto);
                    }
                }
                if (req.body.EspaciosMedicion[i].Indicadores.length == 0) {
                    for (var j = 0; j < req.body.EspaciosMedicion[i].MuestrasMedicion.length; j++) {
                        var objeto = {};
                        objeto.fidEspecialidad = req.body.fidEspecialidad;
                        objeto.codigoMedicion = req.body.codigoMedicion;
                        objeto.cicloInicio = req.body.cicloInicio;
                        objeto.cicloFin = req.body.cicloFin;
                        objeto.codigo = req.body.EspaciosMedicion[i].codigoEspacio;
                        objeto.nombreCurso = req.body.EspaciosMedicion[i].nombreCurso;
                        objeto.fechaLimite = req.body.EspaciosMedicion[i].fechaLimite;
                        objeto.tipoMedicion = req.body.EspaciosMedicion[i].tipoMedicion;
                        objeto.periodo = req.body.EspaciosMedicion[i].cicloAcademico;
                        objeto.horario = req.body.EspaciosMedicion[i].MuestrasMedicion[j].codigo;
                        objeto.codDocente = req.body.EspaciosMedicion[i].MuestrasMedicion[j].codigoResponsable;
                        objeto.fidIndicador = "";
                        objeto.evidencia = "";
                        objeto.idUsuarioCreacion = decoded.id;
                        json.push(objeto);
                    }
                }
            }
        }
        console.log(json);
        console.log("SUEÑOOOOOOOOOOOOOOOO");
        db.EspacioMedicion.insertarMedEspMuestra(json, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            else {
                db.EspacioMedicion.enviarCorreosResponsables(json2, (err, data) => {
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
                res.json({
                    success: true,
                    datos: data
                });
            }

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

//lista mediciones con el idEspecialidad
exports.medicionEspecialidadListar = async (req, res) => {
    try {
    db.Medicion.listarMedicionEspecialidad(req, (err, data) => {
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
        console.log(typeof data)
        const totalFilas = Object.keys(data).length
        const totalPaginas = Math.ceil(Object.keys(data).length / 10);
        const mediciones = data.slice(startIndex, endIndex);
        res.json({
            success: true,
            Programa: mediciones,
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

//lista mediciones con el codigo o nombre
exports.medicionCodigoNombreEspecialidadListar = async (req, res) => {
    try {
    db.Medicion.listarMedicionCodigoNombreEspecialidad(req, (err, data) => {
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

exports.medicionDeshabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        for (let propiedad in req.body) {
            db.Medicion.deshabilitarMedicion(propiedad, decoded.id, (err, data) => {
                if (err) {
                    console.log("waaaaaaaaaaaaaaaaaaaa")
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

exports.medicionDetalleMostrar = async (req, res) => {
    try {
    db.Medicion.mostrarDetalleMedicion(req, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });

            return;
        }

        db.Medicion.listarEspaciosMedicion(req, (err, espaciosData) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message,
                        "fallo": "error al obtener indicadores"
                    }
                });
                return;
            }
            // agrego la nueva data
            data[0].espacios = espaciosData;
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
//////////////////////////// Reportes

// const xl = require('excel4node');

exports.reportesHistoricoMediciones = async (req, res) => {
    try {
        const dataMedicion = await new Promise((resolve, reject) => {
            db.Medicion.reportesHistoricoMediciones(req, (err, dataMedicion2) => {
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
                else {
                    console.log(dataMedicion2);
                    resolve(dataMedicion2);
                }
            });
        });

        if (dataMedicion.length == 0) {
            const blob = new Blob();
            res.send(blob);
            return;
        }



        const workbook = new xl.Workbook();
        // Agregar una hoja al libro


        // Definir estilos para la primera tabla
        const table1Style = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#0E2493',
            },
            font: {
                color: '#FFFFFF',
                bold: true,
                size: 10
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };

        const tableStyle = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#FFFFFF',
            },
            font: {
                color: '#000000',
                bold: false,
                size: 8
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };

        const table3Style = {
            numberFormat: '0.00%',
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#FFFFFF',
            },
            font: {
                color: '#000000',
                bold: false,
                size: 8
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };


        const titulo1Style = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#EAEAEA',
            },
            font: {
                color: '#000000',
                bold: false,
                size: 9
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };


        const titulo2Style = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#FFFFFF',
            },
            font: {
                color: '#000000',
                bold: true,
                size: 10
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };

        const tituloStyle1 = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#f2dbdb',
            },
            font: {
                color: '#000000',
                bold: false,
                size: 9
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };

        const tituloStyle2 = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#b8cce4',
            },
            font: {
                color: '#000000',
                bold: false,
                size: 9
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };

        const tituloStyle3 = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#eaf1dd',
            },
            font: {
                color: '#000000',
                bold: false,
                size: 9
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };


        const tituloAStyle = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#EAEAEA',
            },
            font: {
                color: '#000000',
                bold: false,
                size: 9
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
            border: {
                left: {
                    style: 'thin', // Borde izquierdo con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                right: {
                    style: 'thin', // Borde derecho con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                top: {
                    style: 'thin', // Borde superior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
                bottom: {
                    style: 'thin', // Borde inferior con grosor delgado
                    color: '#000000', // Color del borde en negro
                },
            }
        };

        var arr = [tituloStyle2, tituloStyle1, tituloStyle3];
        var i = 0;
        let row = dataMedicion[0];
        // Escribir la primera tabla en la hoja
       
        var i = 0;
        var j = 0;
        console.log(dataMedicion.length);
        while (i < dataMedicion.length) {
            if (i == 0) {
                if(req.body.nivel!=1)var resp = row.codCurso+' '+row.horario;
                else resp = row.codCurso;
                worksheet = workbook.addWorksheet(resp);
                worksheet.cell(1, 1, 1, 9, true).string('Resultados de Medición del ciclo ' + req.body.periodo).style(titulo2Style);
                worksheet.column(1).setWidth(20);
                worksheet.column(6).setWidth(20);
                worksheet.column(2).setWidth(20);
                worksheet.column(3).setWidth(20);
                worksheet.column(4).setWidth(20);
                worksheet.column(5).setWidth(20);
                worksheet.column(6).setWidth(20);
                worksheet.column(7).setWidth(20);
                worksheet.column(8).setWidth(20);
                worksheet.column(9).setWidth(20);
                worksheet.column(10).setWidth(20);
                worksheet.column(11).setWidth(20);
                worksheet.column(12).setWidth(20);
                worksheet.column(13).setWidth(20);
                worksheet.column(14).setWidth(20);
                worksheet.column(15).setWidth(20);
                // Escribir la primera tabla en la hoja
                worksheet.cell(3 + j, 1, 3 + j, 2, true).string('Especialidad:').style(tituloAStyle);
                worksheet.cell(4 + j, 1, 4 + j, 2, true).string('Espacio de Medición:').style(tituloAStyle);
                worksheet.cell(5 + j, 1, 5 + j, 2, true).string('Muestra:').style(tituloAStyle);
                worksheet.cell(6 + j, 1, 6 + j, 2, true).string('Responsable de Medición:').style(tituloAStyle);
                worksheet.row(6 + j).setHeight(30);
                worksheet.cell(3 + j, 3).string(row.nombreEspecialidad).style(tableStyle);
                worksheet.cell(4 + j, 3).string(row.nombreCurso).style(tableStyle);
                if (req.body.nivel == 1) {
                    worksheet.cell(5 + j, 3).string("Todos").style(tableStyle);
                    worksheet.cell(6 + j, 3).string("Todos").style(tableStyle);
                }
                else {
                    worksheet.cell(5 + j, 3).string(row.horario).style(tableStyle);
                    worksheet.cell(6 + j, 3).string(row.docente).style(tableStyle);
                }
                worksheet.cell(8 + j, 1, 8 + j, 2, true).string('Porcentaje minimo aprobatorio:').style(tituloAStyle);
                worksheet.row(8 + j).setHeight(30);
                worksheet.cell(9 + j, 1, 9 + j, 2, true).string('Puntaje minimo aprobatorio:').style(tituloAStyle);
                worksheet.row(9 + j).setHeight(30);
                if (row.porcentajeMinimo != 0) worksheet.cell(8 + j, 3).number(row.porcentajeMinimo).style(tableStyle);
                else worksheet.cell(8 + j, 3).string("-").style(tableStyle);
                if (row.minimoAprobatorio != 0) worksheet.cell(9 + j, 3).string(row.minimoAprobatorio).style(tableStyle);
                else worksheet.cell(9 + j, 3).string("-").style(tableStyle);
    
    
                worksheet.cell(12 + j, 1, 12 + j, 3, true).string('Descripción').style(tituloAStyle);
                worksheet.cell(13 + j, 1, 13 + j, 3, true).string('Promedio').style(tituloAStyle);
                worksheet.cell(14 + j, 1, 14 + j, 3, true).string('Porcentaje (%)').style(tituloAStyle);
                worksheet.cell(15 + j, 1, 15 + j, 3, true).string('Total aprobatorios').style(tituloAStyle);
                worksheet.cell(16 + j, 1, 16 + j, 3, true).string('Total de Alumnos').style(tituloAStyle);
            }

            row = dataMedicion[i];
            console.log(i);
            console.log("entra1");
            if (i >= dataMedicion.length) break;

            var codcurso = row.codCurso;
            var cuentaAlumnos = 0;
            if (req.body.nivel == 1) {
                var cuentaC = 0;
                var cuenta = 0;
                while (dataMedicion[i].codCurso == codcurso) {
                    if (resp != row.codCurso) {
                        j = 0;
                        if(req.body.nivel!=1)var resp = row.codCurso+' '+row.horario;
                        else resp = row.codCurso;
                        worksheet = workbook.addWorksheet(resp);
                        worksheet.column(1).setWidth(20);
                        worksheet.column(6).setWidth(20);
                        worksheet.column(2).setWidth(20);
                        worksheet.column(3).setWidth(20);
                        worksheet.column(4).setWidth(20);
                        worksheet.column(5).setWidth(20);
                        worksheet.column(6).setWidth(20);
                        worksheet.column(7).setWidth(20);
                        worksheet.column(8).setWidth(20);
                        worksheet.column(9).setWidth(20);
                        worksheet.column(10).setWidth(20);
                        worksheet.column(11).setWidth(20);
                        worksheet.column(12).setWidth(20);
                        worksheet.column(13).setWidth(20);
                        worksheet.column(14).setWidth(20);
                        worksheet.column(15).setWidth(20);
                        worksheet.cell(1, 1, 1, 9, true).string('Resultados de Medición del ciclo ' + req.body.periodo).style(titulo2Style);
                        if(req.body.nivel!=1)var resp = row.codCurso+' '+row.horario;
                        else resp = row.codCurso;
                        worksheet.cell(3 + j, 1, 3 + j, 2, true).string('Especialidad:').style(tituloAStyle);
                        worksheet.cell(4 + j, 1, 4 + j, 2, true).string('Espacio de Medición:').style(tituloAStyle);
                        worksheet.cell(5 + j, 1, 5 + j, 2, true).string('Muestra:').style(tituloAStyle);
                        worksheet.cell(6 + j, 1, 6 + j, 2, true).string('Responsable de Medición:').style(tituloAStyle);
                        worksheet.row(6 + j).setHeight(30);
                        worksheet.cell(3 + j, 3).string(row.nombreEspecialidad).style(tableStyle);
                        worksheet.cell(4 + j, 3).string(row.nombreCurso).style(tableStyle);
                        if (req.body.nivel == 1) {
                            worksheet.cell(5 + j, 3).string("Todos").style(tableStyle);
                            worksheet.cell(6 + j, 3).string("Todos").style(tableStyle);
                        }
                        else {
                            worksheet.cell(5 + j, 3).string(row.horario).style(tableStyle);
                            worksheet.cell(6 + j, 3).string(row.docente).style(tableStyle);
                        }
                        worksheet.cell(8 + j, 1, 8 + j, 2, true).string('Porcentaje minimo aprobatorio:').style(tituloAStyle);
                        worksheet.row(8 + j).setHeight(30);
                        worksheet.cell(9 + j, 1, 9 + j, 2, true).string('Puntaje minimo aprobatorio:').style(tituloAStyle);
                        worksheet.row(9 + j).setHeight(30);
                        if (row.porcentajeMinimo != 0) worksheet.cell(8 + j, 3).number(row.porcentajeMinimo).style(tableStyle);
                        else worksheet.cell(8 + j, 3).string("-").style(tableStyle);
                        if (row.minimoAprobatorio != 0) worksheet.cell(9 + j, 3).string(row.minimoAprobatorio).style(tableStyle);
                        else worksheet.cell(9 + j, 3).string("-").style(tableStyle);
            
            
                        worksheet.cell(12 + j, 1, 12 + j, 3, true).string('Descripción').style(tituloAStyle);
                        worksheet.cell(13 + j, 1, 13 + j, 3, true).string('Promedio').style(tituloAStyle);
                        worksheet.cell(14 + j, 1, 14 + j, 3, true).string('Porcentaje (%)').style(tituloAStyle);
                        worksheet.cell(15 + j, 1, 15 + j, 3, true).string('Total aprobatorios').style(tituloAStyle);
                        worksheet.cell(16 + j, 1, 16 + j, 3, true).string('Total de Alumnos').style(tituloAStyle);
                        console.log("nivel1");
                    }
                    console.log("nivel1");
                    row = dataMedicion[i];
                    if (i >= dataMedicion.length) { break; }
                    var cuentaI = 0;
                    var competencia = row.codigoCompetencia;
                    while (dataMedicion[i].codigoCompetencia == competencia && dataMedicion[i].codCurso == codcurso) {
                        console.log("nivel1");
                        row = dataMedicion[i];
                        if (i >= dataMedicion.length) { break; }
                        console.log(row.codigo);
                        worksheet.cell(12 + j, 4 + cuentaC + cuentaI).string(row.codigo + ' ' + row.descripcionI).style(arr[cuenta]);
                        if (row.tRsultado != null) worksheet.cell(13 + j, 4 + cuentaC + cuentaI).number(row.tRsultado / row.cantAlumnos).style(tableStyle);
                        else worksheet.cell(13 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);
                        if (row.tCumplidos != null) worksheet.cell(14 + j, 4 + cuentaC + cuentaI).number(row.tCumplidos / row.cantAlumnos).style(table3Style);
                        else worksheet.cell(14 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);
                        if (row.tCumplidos != null) worksheet.cell(15 + j, 4 + cuentaC + cuentaI).number(row.tCumplidos).style(tableStyle);
                        else worksheet.cell(15 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);
                        if (row.cantAlumnos != null) worksheet.cell(16 + j, 4 + cuentaC + cuentaI).number(row.cantAlumnos).style(tableStyle);
                        else worksheet.cell(16 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);
                        cuentaI++;
                        i++;
                        console.log(i);
                        if (dataMedicion[i] == null) { break; }
                    }
                    i--;
                    console.log(row.codigoCompetencia);
                    row = dataMedicion[i];
                    if (cuentaI > 1) worksheet.cell(11 + j, 4 + cuentaC, 11 + j, 4 + cuentaI + cuentaC - 1, true).string(row.codigoCompetencia).style(arr[cuenta]);
                    else worksheet.cell(11 + j, 4 + cuentaC).string(row.codigoCompetencia).style(arr[cuenta]);
                    cuentaC = cuentaC + cuentaI;
                    cuenta++;
                    if (cuenta > 2) cuenta = 0;
                    i++;
                    console.log("i despues de indicadores");
                    console.log(i);
                    if (dataMedicion[i] == null) { break; }
                }
            }
            else {
                var cuentaC = 0;
                var horario = row.horario;
                var cuenta = 0;
                while (dataMedicion[i].horario == horario && dataMedicion[i].codCurso == codcurso) {
                    if (resp != row.codCurso+' '+row.horario) {
                        j = 0;
                        if(req.body.nivel!=1)var resp = row.codCurso+' '+row.horario;
                        else resp = row.codCurso;
                        worksheet = workbook.addWorksheet(resp);
                        worksheet.column(1).setWidth(20);
                        worksheet.column(6).setWidth(20);
                        worksheet.column(2).setWidth(20);
                        worksheet.column(3).setWidth(20);
                        worksheet.column(4).setWidth(20);
                        worksheet.column(5).setWidth(20);
                        worksheet.column(6).setWidth(20);
                        worksheet.column(7).setWidth(20);
                        worksheet.column(8).setWidth(20);
                        worksheet.column(9).setWidth(20);
                        worksheet.column(10).setWidth(20);
                        worksheet.column(11).setWidth(20);
                        worksheet.column(12).setWidth(20);
                        worksheet.column(13).setWidth(20);
                        worksheet.column(14).setWidth(20);
                        worksheet.column(15).setWidth(20);
                        worksheet.cell(1, 1, 1, 9, true).string('Resultados de Medición del ciclo ' + req.body.periodo).style(titulo2Style);
                        if(req.body.nivel!=1)var resp = row.codCurso+' '+row.horario;
                        else resp = row.codCurso;
                        worksheet.cell(3 + j, 1, 3 + j, 2, true).string('Especialidad:').style(tituloAStyle);
                        worksheet.cell(4 + j, 1, 4 + j, 2, true).string('Espacio de Medición:').style(tituloAStyle);
                        worksheet.cell(5 + j, 1, 5 + j, 2, true).string('Muestra:').style(tituloAStyle);
                        worksheet.cell(6 + j, 1, 6 + j, 2, true).string('Responsable de Medición:').style(tituloAStyle);
                        worksheet.row(6 + j).setHeight(30);
                        worksheet.cell(3 + j, 3).string(row.nombreEspecialidad).style(tableStyle);
                        worksheet.cell(4 + j, 3).string(row.nombreCurso).style(tableStyle);
                        if (req.body.nivel == 1) {
                            worksheet.cell(5 + j, 3).string("Todos").style(tableStyle);
                            worksheet.cell(6 + j, 3).string("Todos").style(tableStyle);
                        }
                        else {
                            worksheet.cell(5 + j, 3).string(row.horario).style(tableStyle);
                            worksheet.cell(6 + j, 3).string(row.docente).style(tableStyle);
                        }
                        worksheet.cell(8 + j, 1, 8 + j, 2, true).string('Porcentaje minimo aprobatorio:').style(tituloAStyle);
                        worksheet.row(8 + j).setHeight(30);
                        worksheet.cell(9 + j, 1, 9 + j, 2, true).string('Puntaje minimo aprobatorio:').style(tituloAStyle);
                        worksheet.row(9 + j).setHeight(30);
                        if (row.porcentajeMinimo != 0) worksheet.cell(8 + j, 3).number(row.porcentajeMinimo).style(tableStyle);
                        else worksheet.cell(8 + j, 3).string("-").style(tableStyle);
                        if (row.minimoAprobatorio != 0) worksheet.cell(9 + j, 3).string(row.minimoAprobatorio).style(tableStyle);
                        else worksheet.cell(9 + j, 3).string("-").style(tableStyle);
            
            
                        worksheet.cell(12 + j, 1, 12 + j, 3, true).string('Descripción').style(tituloAStyle);
                        worksheet.cell(13 + j, 1, 13 + j, 3, true).string('Promedio').style(tituloAStyle);
                        worksheet.cell(14 + j, 1, 14 + j, 3, true).string('Porcentaje (%)').style(tituloAStyle);
                        worksheet.cell(15 + j, 1, 15 + j, 3, true).string('Total aprobatorios').style(tituloAStyle);
                        worksheet.cell(16 + j, 1, 16 + j, 3, true).string('Total de Alumnos').style(tituloAStyle);
                        console.log("nivel1");
                    }
                    console.log("nivel1");
                    row = dataMedicion[i];
                    if (i >= dataMedicion.length) { break; }
                    var cuentaI = 0;
                    var competencia = row.codigoCompetencia;
                    while (dataMedicion[i].codigoCompetencia == competencia && dataMedicion[i].horario == horario && dataMedicion[i].codCurso == codcurso) {
                        console.log("nivel1");
                        row = dataMedicion[i];
                        if (i >= dataMedicion.length) { break; }
                        console.log(row.codigo);
                        worksheet.cell(12 + j, 4 + cuentaC + cuentaI).string(row.codigo + ' ' + row.descripcionI).style(arr[cuenta]);
                        worksheet.cell(22 + j, 4 + cuentaC + cuentaI).string(row.codigo + ' ' + row.descripcionI).style(arr[cuenta]);
                        worksheet.cell(22 + j, 1).string("ITEM").style(tituloAStyle);
                        worksheet.cell(22 + j, 2).string("CÓDIGO DEL ALUMNO").style(tituloAStyle);
                        worksheet.cell(22 + j, 3).string("NOMBRE Y APELLIDOS").style(tituloAStyle);
                        if (row.cantAlumnos != 0) worksheet.cell(13 + j, 4 + cuentaC + cuentaI).number(row.tRsultado / row.cantAlumnos).style(tableStyle);
                        else worksheet.cell(13 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);
                        if (row.cantAlumnos != 0) worksheet.cell(14 + j, 4 + cuentaC + cuentaI).number(row.tCumplidos / row.cantAlumnos).style(table3Style);
                        else worksheet.cell(14 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);
                        if (row.tCumplidos != null) worksheet.cell(15 + j, 4 + cuentaC + cuentaI).number(row.tCumplidos).style(tableStyle);
                        else worksheet.cell(15 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);
                        if (row.cantAlumnos != null) worksheet.cell(16 + j, 4 + cuentaC + cuentaI).number(row.cantAlumnos).style(tableStyle);
                        else worksheet.cell(16 + j, 4 + cuentaC + cuentaI).string("-").style(table3Style);

                        const dataAlumno = await new Promise((resolve, reject) => {
                            db.Medicion.reporteAlumnos(row.idIndicador, row.idMuestraMedicion, (err, dataAlumno2) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(dataAlumno2);
                                }
                            });
                        });

                        for (let m = 0; m < dataAlumno.length; m++) {
                            worksheet.cell(23 + m + j, 1).number(m + 1).style(tableStyle);
                            worksheet.cell(23 + m + j, 2).string(dataAlumno[m].codigo).style(tableStyle);
                            worksheet.cell(23 + m + j, 3).string(dataAlumno[m].nombre).style(tableStyle);
                            worksheet.cell(23 + m + j, 4 + cuentaC + cuentaI).string(dataAlumno[m].resultados[dataAlumno[m].posicionResultado]).style(tableStyle);
                        }

                        cuentaAlumnos = dataAlumno.length;
                        cuentaI++;
                        i++;
                        console.log(i);
                        if (dataMedicion[i] == null) { break; }
                    }

                    i--;
                    console.log(row.codigoCompetencia);
                    row = dataMedicion[i];
                    if (cuentaI > 1) {
                        worksheet.cell(11 + j, 4 + cuentaC, 11 + j, 4 + cuentaI + cuentaC - 1, true).string(row.codigoCompetencia).style(arr[cuenta]);
                        worksheet.cell(21 + j, 4 + cuentaC, 21 + j, 4 + cuentaI + cuentaC - 1, true).string(row.codigoCompetencia).style(arr[cuenta]);
                    }
                    else {
                        worksheet.cell(11 + j, 4 + cuentaC).string(row.codigoCompetencia).style(arr[cuenta]);
                        worksheet.cell(21 + j, 4 + cuentaC).string(row.codigoCompetencia).style(arr[cuenta]);
                    }
                    cuentaC = cuentaC + cuentaI;
                    i++;
                    cuenta++;
                    if (cuenta > 2) cuenta = 0;
                    console.log("i despues de indicadores");
                    console.log(i);

                    if (dataMedicion[i] == null) { break; }

                }
            }

            if (req.body.nivel == 1) j = j + 19 + cuentaAlumnos + 3;
            else j = j + 19 + cuentaAlumnos + 8;
            worksheet.cell(j, 1, j, 9, true).style(tituloAStyle);


            if (dataMedicion[i] == null) { break; }
        }
        workbook.write('Reporte de Mediciones.xlsx', res);


    } catch (error) {
        if (error.sqlState == 45000) {//Entrada repetida
            res.json({
                success: false,
                error: {
                    "message": error.sqlMessage
                }
            });
            return;
        }
        res.json({
            success: false,
            error: {
                "message": error.message
            }
        });
    }
}


exports.ModificarMedicionPeriodo = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.idUsuarioCreacion = decoded.id;
        db.Medicion.modificarMedicionPeriodo(req, (err, data) => {
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

exports.medicionDuplicar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.idUsuarioCreacion = decoded.id;
        req.body.idCicloInicio = parseInt(req.body.idCicloInicio.replace("-", ""));
        db.Medicion.duplicarMedicion(req, (err, data, codigo) => {
            if (err) {
                console.log(err)
                if(err.sqlState==45000){//Entrada repetida
                    res.json({
                        success: false,
                        error: {
                            "message": err.sqlMessage
                        }
                    });
                    return;
                }
                if (err.errno==1452){
                    if(err.sqlMessage.includes("idcicloAcademico")){
                        console.log("idcicloAcademico")
                        db.Medicion.duplicarMedicionIgnoring(req, (err2, data, codigo2) => {
                            if (err2) {
                                console.log(err2)
                                if (err2.sqlState == 45000) {//Entrada repetida
                                    res.json({
                                        success: false,
                                        error: {
                                            "message": err2.sqlMessage
                                        }
                                    });
                                    return;
                                }
                                console.log("error2222");
                                res.json({
                                    success: false,
                                    error: {
                                        "message": err2.message
                                    }
                                });
                                return;
                            }
                            console.log("errrbueno")
                            res.json({
                                success: false,
                                error: {
                                    "message": "No se generaron los espacios/cursos con ciclos académicos sin registrar.\nContacte al administrador.",
                                    idMedicion: data,
                                    codigo: codigo2
                                }
                            });
                            return;
                        });
                        return;
                    }
                    return;
                }
                console.log(err);
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
                idMedicion: data,
                codigo: codigo
            });
            return;
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