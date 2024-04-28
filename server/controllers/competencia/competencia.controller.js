const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Competencia = require('../../models/competencia/competencia.model');
const Indicador = require('../../models/competencia/indicador.model');
const Rubrica = require('../../models/competencia/rubrica.model');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');
const xl = require('excel4node');
const { Blob } = require('buffer');

exports.competenciaInsertar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const competencia = new Competencia(req.body.fidEspecialidad, 1, req.body.codigo, req.body.descripcion, req.body.evidencia, decoded.id, decoded.id, decoded.id);
        
        try {
            const idCompetencia = await new Promise((resolve, reject) => {
                db.Competencia.insertarCompetencia(competencia, (err, idCompetencia) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("competencia insertada. idCOmpetenecia: " + idCompetencia);
                        resolve(idCompetencia);
                    }
                });
            });

            for (let propiedad in req.body.Indicadores) {
                //console.log(req.body.Indicadores[propiedad].codigo)
                var propiedad2 = req.body.Indicadores[propiedad];
                console.log("indicador sin terminar")
                console.log(propiedad2)
                const indicador = new Indicador(1, idCompetencia, propiedad2.descripcion, 4, 4, propiedad2.codigo, 1, decoded.id, decoded.id, decoded.id);
                const idIndicador = await new Promise((resolve, reject) => {
                    db.Indicador.insertarIndicador(indicador, (err, idIndicador) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log("indicador insertado. idIndicador: " + idIndicador);
                            resolve(idIndicador);
                        }
                    });
                });
                console.log("indicador terminado")
                console.log(propiedad2)
                for (var i = 0; i < propiedad2.Rubricas.length; i++) {
                    //console.log(req.body.Indicadores[propiedad].codigo)
                    var propiedad3 = propiedad2.Rubricas[i];

                    const rubrica = new Rubrica(1, idIndicador, i + 1, propiedad3.descripcion, 1, decoded.id, decoded.id, decoded.id);
                    await new Promise((resolve, reject) => {
                        db.Rubrica.insertarRubrica(rubrica, (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.log("rubrica insertada. idRubrica: " + data);
                                resolve(data);
                            }
                        });
                    });
                    console.log("rubrica terminada")
                }
            }
            res.json({
                success: true
            });
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

exports.competenciaListar = async (req, res) => {
    try {
    db.Competencia.listarCompetencia(req, (err, dataCompetencia) => {
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
        const totalFilas = Object.keys(dataCompetencia).length
        const totalPaginas = Math.ceil(Object.keys(dataCompetencia).length / 10);
        const competencias = dataCompetencia.slice(startIndex, endIndex);
        res.json({
            success: true,
            Competencia: competencias,
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


exports.competenciaModificar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const competencia = new Competencia(1, req.body.idCompetencia, req.body.codigo, req.body.descripcion, req.body.evidencia, decoded.id, decoded.id, decoded.id);
        db.Competencia.modificarCompetencia(competencia, (err, dataCompetencia) => {
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            // for (let propiedad in req.body.Indicadores) {
            //     //console.log(req.body.Indicadores[propiedad].codigo)
            //     var propiedad2 = req.body.Indicadores[propiedad];
            //     const indicador = new Indicador(propiedad2.idIndicador, 1, propiedad2.descripcion, 4, 4, propiedad2.codigo, 1, decoded.id, decoded.id, decoded.id);
            //     db.Indicador.modificarIndicador(indicador, (err, idIndicador) => {
            //         if (err) {
            //             res.json({
            //                 success: false,
            //                 error: {
            //                     "message": err.message
            //                 }
            //             });
            //             return;
            //         }
            //         for (var i = 0; i < propiedad2.Rubricas.length; i++) {
            //             //console.log(req.body.Indicadores[propiedad].codigo)
            //             var propiedad3 = propiedad2.Rubricas[i];

            //             const rubrica = new Rubrica(propiedad3.idRubrica, 1, i + 1, propiedad3.descripcion, 1, decoded.id, decoded.id, decoded.id);
            //             db.Rubrica.modificarRubrica(rubrica, (err, data) => {
            //                 if (err) {
            //                     res.json({
            //                         success: false,
            //                         error: {
            //                             "message": err.message
            //                         }
            //                     });
            //                     return;
            //                 }

            //             })
            //         }
            //     })
            // }
            res.json({
                success: true,
            });
        })
        //-----------------FALTA CODIGO PARA LLAMAR AL MODIFICAR INDICADORES Y RUBRICAS---------------------
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


exports.competenciaDeshabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);

        for (let propiedad in req.body) {
            db.Competencia.deshabilitarCompetencia(propiedad, decoded.id, (err, dataCompetencia) => {
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
        //-----------------FALTA CODIGO PARA LLAMAR AL MODIFICAR INDICADORES Y RUBRICAS---------------------
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



exports.competenciasHistorico = async (req, res) => {
    try{
    db.Competencia.reporteIndicadores(req, (err, dataCompetencia) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }


        if (dataCompetencia.length == 0) {
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


        var n = dataCompetencia.length;
        var i = 0;

        for (let l = 0; l < n; l++) {
            let row = dataCompetencia[l];
            if (l >= n) break;
            if (i == 0) {
                var resp = row.codigoCompetencia;
                worksheet = workbook.addWorksheet(row.codigoCompetencia);
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
                worksheet.cell(1, 1, 1, 9, true).string('REPORTE DE HISTÓRICO DE INDICADORES').style(titulo2Style);
            }
            if (resp != row.codigoCompetencia) {
                i = 0;
                worksheet = workbook.addWorksheet(row.codigoCompetencia);
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
                worksheet.cell(1, 1, 1, 9, true).string('REPORTE DE HISTÓRICO DE INDICADORES').style(titulo2Style);
                resp = row.codigoCompetencia;
            }
            worksheet.cell(3 + i, 1, 3 + i, 9, true).string(row.codigoCompetencia + ' ' + '(' + row.descripcionC + ')').style(titulo1Style);
            worksheet.cell(4 + i, 1).string('Estado').style(table1Style);
            worksheet.cell(4 + i, 2).string('Usuario Creación').style(table1Style);
            worksheet.cell(4 + i, 3).string('Fecha de Creación').style(table1Style);
            worksheet.cell(4 + i, 4).string('Usuario inactivación').style(table1Style);
            worksheet.cell(4 + i, 5).string('Fecha de inactivación').style(table1Style);
            if (row.activo == 1) worksheet.cell(i + 5, 1).string('Activo').style(tableStyle);
            else worksheet.cell(i + 5, 1).string('Inactivo').style(tableStyle);
            worksheet.cell(i + 5, 2).string(row.usuarioCreacionC).style(tableStyle);
            worksheet.cell(i + 5, 3).date(row.fechaCreacionC).style(tableStyle);
            worksheet.cell(i + 5, 4).style(tableStyle);
            worksheet.cell(i + 5, 5).style(tableStyle);
            if (row.usuarioAnulacionC != '') worksheet.cell(i + 5, 4).string(row.usuarioAnulacionC).style(tableStyle);
            if (row.fechaAnulacionC != '') worksheet.cell(i + 5, 5).date(row.fechaAnulacionC).style(tableStyle);

            worksheet.cell(7 + i, 1, 8 + i, 1, true).string('Indicador de Desempeño').style(table1Style);
            worksheet.cell(7 + i, 2, 7 + i, 1 + row.niveles, true).string('Nivel').style(table1Style);
            worksheet.cell(7 + i, 2 + row.niveles, 8 + i, 2 + row.niveles, true).string('Usuario Creación').style(table1Style);
            worksheet.cell(7 + i, 3 + row.niveles, 8 + i, 3 + row.niveles, true).string('Fecha de Creación').style(table1Style);
            worksheet.cell(7 + i, 4 + row.niveles, 8 + i, 4 + row.niveles, true).string('Usuario Inactivación').style(table1Style);
            worksheet.cell(7 + i, 5 + row.niveles, 8 + i, 5 + row.niveles, true).string('Fecha de Inactivación').style(table1Style);

            var k = 0;
            while (k < row.niveles) {
                worksheet.cell(8 + i, 2 + k).number(k + 1).style(table1Style);
                k++;
            }
            i = i + 9;
            console.log(l);
            let lind = row.idCompetencia;
            console.log(lind);
            while (lind == dataCompetencia[l].idCompetencia) {
                row = dataCompetencia[l];
                if (lind != dataCompetencia[l].idCompetencia) { console.log("sali"); break; }
                console.log(dataCompetencia[l].idCompetencia);
                worksheet.cell(i, 1).string(row.codigo + ' ' + row.descripcionI).style(tableStyle);
                worksheet.cell(i, 2 + row.niveles).string(row.usuarioCreacionI).style(tableStyle);
                worksheet.cell(i, 3 + row.niveles).date(row.fechaCreacionI).style(tableStyle);
                if (row.usuarioAnulacionI != '') worksheet.cell(i, 4 + row.niveles).string(row.usuarioAnulacionI).style(tableStyle);
                if (row.fechaAnulacionI != '') worksheet.cell(i, 5 + row.niveles).date(row.fechaAnulacionI).style(tableStyle);
                worksheet.cell(i, 4 + row.niveles).style(tableStyle);
                worksheet.cell(i, 5 + row.niveles).style(tableStyle);

                var j = 0;
                var niveles = row.niveles;
                while (j < niveles) {
                    row = dataCompetencia[l];
                    if (row.nivel == null) { worksheet.cell(i, 2 + j, i, 2 + niveles).style(tableStyle); l++; console.log("sali2"); break };
                    worksheet.cell(i, 2 + j).string(row.descripcionR).style(tableStyle);
                    j++;
                    l++;
                }
                l--;
                console.log("sali3");
                i++;
                l++;
                if (dataCompetencia[l] == null) break;
            }
            l--;
            i = i + 1;
            console.log(l);

        }

        workbook.write('Reporte historico de indicadores.xlsx', res);
        });
    }
    catch (error) {
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
    // Enviar el archivo de Excel como respuesta

}