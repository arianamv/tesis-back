const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const { getSignUrlForFile, deleteObject } = require('../../config/S3');

exports.eliminarEvidencias = async (req, res) => {
    try {
    const archivosExcel = req.body;
    console.log(archivosExcel)
    for (const archivo of archivosExcel) {
        console.log('Nombre del archivo:', archivo.name);
        db.MuestraMedicion.eliminarEvidencias(archivo.idDetalleCompetenciaXMuestra, archivo.fidCompetenciaXMuestra, (err, data) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            deleteObject(archivo.token);
        });
    }
    res.json({
        success: true,
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

exports.descargarEvidencia = async (req, res) => {
    try {
    const url = getSignUrlForFile(req.body.token);
    url.then(result => {
        res.json({
            success: true,
            archivo: result
        });
    }).catch(error => {
        console.error(error);
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




exports.muestraMedicionInsertar = (req, res) => {
    try {
    var rpta;
    //console.log(req.body.correo);
    db.MuestraMedicion.insertarMuestraMedicion(req, (err, data) => {
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

exports.muestraMedicionListarHistorico = async (req, res) => {
    try {
    db.MuestraMedicion.listarHistoricoMuestraMedicionUsuario(req, (err, data) => {
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

exports.muestraMedicionLista = async (req, res) => {
    try {
    db.MuestraMedicion.listarMuestraMedicionUsuario(req, (err, data) => {
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
        const totalFilas = Object.keys(data).length;
        const totalPaginas = Math.ceil(Object.keys(data).length / 10);
        const mediciones = data.slice(startIndex, endIndex);
        res.json({
            success: true,
            Medicion: mediciones,
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
/*
exports.muestraMedicionEnviar = (req, res) => {
    //console.log(req.body.correo);
    db.MuestraMedicion.enviarMuestraMedicion(req, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        if (data == false) {
            res.json({
                success: false
            });
            return;
        }
        res.json({
            success: true
        });
    })
}*/

exports.muestraMedicionDetalle = async (req, res) => {
    try {
    db.MuestraMedicion.mostrarDetalleMuestraMedicion(req, (err, data) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }

        db.MuestraMedicion.listarCompetenciasMuestraMedicion(req, (err, competenciasData) => {
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
            if (data[0] !== null && typeof data[0] === "object") {
                data[0].competencias = competenciasData;
            }
            else {
                data[0] = {};
            }
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
exports.muestraMedicionListarIndicadores = async (req, res) => {
    try {
    db.MuestraMedicion.listarIndicadoresMuestraMedicion(req, (err, data) => {
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

exports.muestraMedicionListarCompetencias = async (req, res) => {
    try {
    db.MuestraMedicion.listarCompetenciasMuestraMedicion(req, (err, data) => {
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

exports.muestraMedicionListarCompetenciaIndicadores = async (req, res) => {
    try {
    db.MuestraMedicion.listarIndicadoresCompetenciasMuestraMedicion(req, (err, data) => {
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

exports.muestraMedicionListarNombreCoidgo = async (req, res) => {
    try {
    db.MuestraMedicion.listarMedicionesUsuarioNombreCodigoEspacio(req, (err, data) => {
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
        const totalFilas = Object.keys(data).length;
        const totalPaginas = Math.ceil(Object.keys(data).length / 10);
        const mediciones = data.slice(startIndex, endIndex);
        res.json({
            success: true,
            Medicion: mediciones,
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

exports.muestraMedicionInsertarAlumno = async (req, res) => {
    try {
    db.MuestraMedicion.insertarAlumnoMuestraMedicion(req, (err, data) => {
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


exports.muestraMedicionListarAlumnosIndicador = async (req, res) => {
    try {
    db.MuestraMedicion.listarAlumnosIndicadorMuestraMedicion(req, (err, data) => {
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

exports.muestraMedicionInsertarNotaAlumno = async (req, res) => {
    try {
    db.MuestraMedicion.insertarNotaAlumnoMuestraMedicion(req, (err, data) => {
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

exports.muestraMedicionListarAlumnos2 = async (req, res) => {
    try {
    db.MuestraMedicion.listarAlumnosMuestra2(req, (err, data) => {
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


exports.muestraMedicionListarIndicadores2 = async (req, res) => {
    try {
    db.MuestraMedicion.listarIndicadoresXcomptenciXMuestra2(req, (err, data) => {
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


//// fase 4 
exports.muestraMedicionInsertarNota2 = async (req, res) => {
    try {
    console.log("req.body.alumnos: " + req.body.alumnos)
    let alumnos = req.body.alumnos;
    console.log("alumnos: " + alumnos)

    for (var i = 0; i < alumnos.length; i++) {
        let resultadosAlum = alumnos[i];
        console.log("resultadosAlum: " + resultadosAlum)
        db.MuestraMedicion.asignarNotaMuestra2(resultadosAlum, (err, data) => {
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


exports.muestraMedicionListarTodoIndicadores = async (req, res) => {
    try {
    db.MuestraMedicion.listarTodoIndicaroresMuestraMedicion(req, (err, data) => {
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

exports.muestraMedicionRegistrarResumenIndicador = async (req, res) => {
    try {
    db.MuestraMedicion.registarResumenIndicadorXMuestraMedicion(req, (err, data) => {
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

//////////////////////////// Reportes
const xl = require('excel4node');
const { Blob } = require('buffer');
exports.reportesResultadoGeneral = async (req, res) => {
    try {
    db.MuestraMedicion.reporteResultadoGeneral(req, (err, dataMedicion) => {
        console.log(req.body)
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        console.log("dataMedicion")
        console.log(dataMedicion)

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


        const titulo1Style = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#A6ACAF',
            },
            font: {
                color: '#000000',
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

        var i = 0;
        let row = dataMedicion[0];
        worksheet = workbook.addWorksheet('Resumen');
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
        worksheet.cell(1, 1, 1, 9, true).string('Reporte de Resultados General').style(titulo2Style);
        worksheet.cell(3, 1).string('Especialidad').style(table1Style);
        worksheet.cell(4, 1).string('Espacio Medición').style(table1Style);
        worksheet.cell(5, 1, 6, 1, true).string('Periodo de Medicion').style(table1Style);
        worksheet.cell(5, 2).string('Desde').style(table1Style);
        worksheet.cell(6, 2).string('Hasta').style(table1Style);
        worksheet.cell(8, 1).string('RE').style(table1Style);
        worksheet.cell(8, 2).string('Indicador').style(table1Style);
        worksheet.cell(3, 2).string(row.nombreEspecialidad).style(tableStyle);
        if (req.body.codCurso != "TODOS") worksheet.cell(4, 2).string(req.body.codCurso).style(tableStyle);
        else worksheet.cell(4, 2).string("Todos").style(tableStyle);
        worksheet.cell(5, 3).string(req.body.periodoI).style(tableStyle);
        worksheet.cell(6, 3).string(req.body.periodoF).style(tableStyle);

        var pI = req.body.periodoI;
        var pF = req.body.periodoF;

        function listarCicloAcademico(pI, pF) {
            return new Promise((resolve, reject) => {
                db.MuestraMedicion.listarCicloAcademico(pI, pF, (err, listadociclo) => {
                    if (err) {
                        reject(err);
                    } else {
                        return resolve(listadociclo);
                    }
                });
            });
        }

        const lista = listarCicloAcademico(pI, pF);

        lista.then((result) => {
            if (result.length != 0) {
                var k = 0;
                while (k < result.length) {
                    var row2 = result[k];
                    worksheet.cell(8, 3 + k).string(row2.ciclo).style(table1Style);
                    k++;
                }
            }
            var n = dataMedicion.length;
            i = 9;
            var ini = i;
            for (let l = 0; l < n; l++) {
                row = dataMedicion[l];
                let lcomp = row.codigoCompetencia;
                console.log(dataMedicion[l].codigoCompetencia);
                var cont = 0;
                while (lcomp == dataMedicion[l].codigoCompetencia) {
                    row = dataMedicion[l];
                    if (dataMedicion[l] == null) break;
                    if (lcomp != dataMedicion[l].codigoCompetencia) { console.log("sali"); break; }
                    let lid = row.idIndicador;
                    let esp = row.codCurso;
                    worksheet.cell(i, 2).string(row.codigo + ' ' + row.descripcionI).style(tableStyle);
                    var periodo = 0;
                    console.log(dataMedicion[l].idIndicador);
                    while (lid == dataMedicion[l].idIndicador && esp == dataMedicion[l].codCurso) {
                        row = dataMedicion[l];
                        if (lid != dataMedicion[l].idIndicador) { l++; console.log("sali2"); break };
                        //funcion para saber a cual ciclo agregar
                        console.log(result);
                        for (var j = 0; j < result.length; j++) {
                            if (result[j].ciclo == row.ciclo) { console.log(row.ciclo); periodo = j; break; }
                        }
                        if (row.cantAlumnos != 0) {
                            worksheet.cell(i, periodo + 3).number(row.tCumplidos / row.cantAlumnos).style(table3Style);
                        }

                        l++;
                        if (dataMedicion[l] == null) { cont++; break; }
                        cont++;
                    }

                    //imprime nombre indicador
                    l--;
                    console.log("sali3");
                    i++;
                    l++;
                    if (dataMedicion[l] == null) break;
                }
                //imprime competencia
                console.log("CICLOS");
                console.log(result.length);
                worksheet.cell(ini, 3, i - 1, 2 + result.length).style(table3Style);
                if (cont > 1) worksheet.cell(ini, 1,i-1, 1, true).string(row.codigoCompetencia).style(titulo1Style);
                else worksheet.cell(ini, 1).string(row.codigoCompetencia).style(titulo1Style);
                ini = i;
                l--;
                console.log(l);
                if (dataMedicion[l] == null) break;
            }
            workbook.write('Reporte de Resultados General.xlsx', res);


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


exports.muestraMedicionEnviar2 = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.usuarioModificacion = decoded.id;

        db.MuestraMedicion.enviarMuestra2(req, (err, data) => {
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
                //idObjetivoEducacional: idObjetivoEducacional,
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

exports.listarEvidencias = async (req, res) => {
    try {
    db.MuestraMedicion.listarEvidencias(req.body.idCompetencia, req.body.idMuestra,req.body.idIndicador, (err, data) => {
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






exports.muestraMedicionReporteSeguimiento = async (req, res) => {
    try {
    db.MuestraMedicion.reporteSeguimientoDeMuestras(req, (err, dataMuestra) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }

        if (dataMuestra.length == 0) {
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


        const titulo1Style = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: '#A6ACAF',
            },
            font: {
                color: '#000000',
                bold: true,
                size: 10
            },
            alignment: {
                horizontal: 'center', // Alineación horizontal centrada
                vertical: 'center',
                wrapText: true, // Envoltura de texto activada
            },
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
        };


        var n = dataMuestra.length;
        var i = 0;

        for (let l = 0; l < n; l++) {
            let row = dataMuestra[l];
            if (l >= n) break;
            if (i == 0) {
                //console.log("escribiendo encabezados...")
                var resp = row.nombreEspecialidad;
                worksheet = workbook.addWorksheet("Reporte");
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
                worksheet.cell(1, 1, 1, 7, true).string('REPORTE DE SEGUIMIENTO DE MUESTRAS').style(titulo2Style);

                worksheet.cell(3 + i, 1).string('Especialidad').style(titulo1Style);
                worksheet.cell(3 + i, 2, 3 + i, 3, true).string(row.nombreEspecialidad).style(titulo1Style);
                worksheet.cell(5 + i, 1, 6 + i, 1, true).string('Fecha de Creación').style(table1Style);
                worksheet.cell(5 + i, 2).string('Desde').style(titulo1Style);
                worksheet.cell(5 + i, 3).string(req.body.fechaD).style(titulo1Style);
                worksheet.cell(6 + i, 2).string('Hasta').style(titulo1Style);
                worksheet.cell(6 + i, 3).string(req.body.fechaH).style(titulo1Style);

                worksheet.cell(8 + i, 1).string('Periodo').style(table1Style);
                worksheet.cell(8 + i, 2).string('Fecha Límite').style(table1Style);
                worksheet.cell(8 + i, 3).string('Espacio de Medición').style(table1Style);
                worksheet.cell(8 + i, 4).string('Muestra').style(table1Style);
                worksheet.cell(8 + i, 5).string('Responsable de Medición').style(table1Style);
                worksheet.cell(8 + i, 6).string('Estado').style(table1Style);
                worksheet.cell(8 + i, 7).string('Enviado').style(table1Style);
                i++;
            }
            //console.log("escribiendo filas...")
            worksheet.cell(i + 8, 1).string(row.nombreCiclo).style(tableStyle);
            worksheet.cell(i + 8, 2).date(row.fechaLimite).style(tableStyle);
            worksheet.cell(i + 8, 3).string(row.codigoEspacio).style(tableStyle);
            worksheet.cell(i + 8, 4).string(row.codigoMuestra).style(tableStyle);
            worksheet.cell(i + 8, 5).string(row.responsableMuestraMedicion).style(tableStyle);
            if (row.estadoMuestra == 0) {
                worksheet.cell(i + 8, 6).string('Anulado').style(tableStyle);
            }
            else {
                if (row.enviado == 0) {
                    worksheet.cell(i + 8, 6).string('En progreso').style(tableStyle);
                }
                else {
                    worksheet.cell(i + 8, 6).string('Completado').style(tableStyle);
                }
            }

            if (row.enviado == 1) {
                worksheet.cell(i + 8, 7).string('Sí').style(tableStyle);
            }
            else {
                worksheet.cell(i + 8, 7).string('No').style(tableStyle);
            }
            i++;
        }
        workbook.write('Reporte Seguimiento de Muestras de Medición.xlsx', res);
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
    // Enviar el archivo de Excel como respuesta
}


const xlsx = require('xlsx');
exports.insertarCargaMasiva = async (req, res) => {
    const archivo = req.files.archivo;//formdata archivo
    const workbook = xlsx.readFile(archivo.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    jsonData.forEach((fila) => {
        const columna1 = fila.columna1;
        const columna2 = fila.columna2;
        console.log(columna1);
        console.log(columna2);
        // db.EspacioMedicion.listarEspacioMedicionNombreCurso(req,(err,data)=>{
        //     if(err){
        //         res.json({
        //             success: false,
        //             error: {
        //                 "message": err.message
        //             }
        //         });
        //         return;
        //     }
        //     res.json({
        //         success: true,
        //         data: data
        //     });
        // })
    });
}
exports.AgregarMuestraMedicionTodos = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.idUsuarioCreacion = decoded.id;
        db.MuestraMedicion.insertarMuestraMedicionTodos(req, (err, data) => {
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

exports.muestraMedicionListaEspecialidad = async (req, res) => {
    try {
    db.MuestraMedicion.listarMuestraMedicionEspecialidad(req, (err, data) => {
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
        const totalFilas = Object.keys(data).length;
        const totalPaginas = Math.ceil(Object.keys(data).length / 10);
        const mediciones = data.slice(startIndex, endIndex);
        res.json({
            success: true,
            Medicion: mediciones,
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

exports.EliminarMuestrasMedicionTodos = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        var json = [];
        console.log("Tamaño de elementos");
        console.log(req.body.elementos.length);
        for (var i = 0; i < req.body.elementos.length; i++) {
            var objeto = {};
            objeto.idEspacioMedicion = req.body.idEspacioMedicion;
            objeto.idMuestra = req.body.elementos[i].idMuestra;
            objeto.idUsuarioCreacion = decoded.id;
            json.push(objeto);
        }
        console.log(json);
        db.MuestraMedicion.eliminarMuestrasMedicionTodos(json, (err, data) => {
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


exports.ModificarResponable = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        req.body.idUsuarioCreacion = decoded.id;
        db.MuestraMedicion.ModificarResponable(req, (err, data) => {
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


