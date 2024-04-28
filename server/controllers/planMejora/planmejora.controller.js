const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const PlanMejora = require('../../models/planMejora/planmejora.model');

const Propuesta = require('../../models/planMejora/propuesta.model');
const Actividad = require('../../models/planMejora/actividad.model');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');
const xl = require('excel4node');
const { Blob } = require('buffer');

exports.planMejoraInsertar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const planMejora = new PlanMejora(1, req.body.fidEspecialidad, 1, req.body.codigo, req.body.descripcion, 1, decoded.id, decoded.id, decoded.id);
        try {
            const idPlanMejora = await new Promise((resolve, reject) => {
                db.PlanMejora.insertarPlanMejora(planMejora, (err, idPlanMejora) => {
                    if (err) {
                        if(err.sqlState==45000){//Entrada repetida
                            res.json({
                                success: false,
                                error: {
                                    "message": err.sqlMessage
                                }
                            });
                            return;
                        }
                        reject(err);
                    } else {
                        resolve(idPlanMejora);
                    }
                });
            });
            for (let propiedad of req.body.Propuestas) {

                var propiedad2 = propiedad;

                const propuesta = new Propuesta(1, idPlanMejora, propiedad2.codigo, propiedad2.descripcion, 1, decoded.id, decoded.id, decoded.id);
                const idPropuesta = await new Promise((resolve, reject) => {
                    db.Propuesta.insertarPropuesta(propuesta, (err, idPropuesta) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(idPropuesta);
                        }
                    });
                });
                for (var i = 0; i < propiedad2.actividades.length; i++) {
                    //console.log(req.body.Indicadores[propiedad].codigo)
                    var propiedad3 = propiedad2.actividades[i];
                    const actividad = new Actividad(1, idPropuesta, propiedad3.codigo, propiedad3.descripcion, propiedad3.evidencia, propiedad3.responsable, 1, 1, decoded.id, decoded.id, decoded.id);
                    await new Promise((resolve, reject) => {
                        db.Actividad.insertarActividad(actividad, (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        });
                    });
                }
            }
            res.json({
                success: true
            });
        } catch (error) {
            res.json({
                success: false,
                error: {
                    "message": error.message
                }
            });
        }
        // db.PlanMejora.insertarPlanMejora(planMejora, (err, idPlanMejora) => {
        //     if (err) {
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
        //         idPlanMejora: idPlanMejora,
        //     });
        // })
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


exports.planMejoraListar = async (req, res) => {
    try {
    db.PlanMejora.listarHistoricoPlanMejora(req, (err, dataPlanMejora) => {
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
        const totalFilas = Object.keys(dataPlanMejora).length
        const totalPaginas = Math.ceil(Object.keys(dataPlanMejora).length / 10);
        const planMejora = dataPlanMejora.slice(startIndex, endIndex);
        res.json({
            success: true,
            PlanMejora: planMejora,
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

exports.planMejoraModificar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const planMejora = new PlanMejora(req.body.idPlanMejora, 1, 1, req.body.codigo, req.body.descripcion, 1, decoded.id, decoded.id, decoded.id);
        db.PlanMejora.modificarPlanMejora(planMejora, (err, dataPlanMejora) => {
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


exports.planMejoraModificar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const planMejora = new PlanMejora(req.body.idPlanMejora, 1, 1, req.body.codigo, req.body.descripcion, 1, decoded.id, decoded.id, decoded.id);
        db.PlanMejora.modificarPlanMejora(planMejora, (err, dataPlanMejora) => {
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


exports.planMejoraActivoListar = async (req, res) => {
    try {
    db.PlanMejora.listarActivosPlanMejora(req, (err, dataPlanMejora) => {
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
        const totalFilas = Object.keys(dataPlanMejora).length
        const totalPaginas = Math.ceil(Object.keys(dataPlanMejora).length / 10);
        const planMejora = dataPlanMejora.slice(startIndex, endIndex);
        res.json({
            success: true,
            PlanMejora: planMejora,
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


exports.planMejoraAnular = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);

        for (let propiedad in req.body) {
            db.PlanMejora.anularPlanMejora(propiedad, decoded.id, (err, data) => {
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




exports.planMejoraExportarReporte = async (req, res) => {
    try {
    db.PlanMejora.reportePlanesMejora(req, (err, dataPlanMejora) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }


        if (dataPlanMejora.length == 0) {
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


        var n = dataPlanMejora.length;
        var i = 0;
        var planActual;
        var propuestaActual;
        var filaPropuesta;
        var filaInicial;

        for (let l = 0; l < n; l++) {
            let row = dataPlanMejora[l];
            if (l >= n) break;
            if (i == 0) {
                //console.log("escribiendo encabezados...")
                var resp = row.nombreEspecialidad;
                worksheet = workbook.addWorksheet("Reporte");
                worksheet.column(1).setWidth(40);
                worksheet.column(2).setWidth(40);
                worksheet.column(3).setWidth(40);
                worksheet.column(4).setWidth(20);
                worksheet.column(5).setWidth(10);
                worksheet.column(6).setWidth(10);
                worksheet.column(7).setWidth(30);
                worksheet.column(8).setWidth(30);
                // Escribir la primera tabla en la hoja
                worksheet.cell(1, 1, 1, 8, true).string('REPORTE DE PLANES DE MEJORA').style(titulo2Style);

                worksheet.cell(3 + i, 1).string('Especialidad').style(titulo1Style);
                worksheet.cell(3 + i, 2, 3 + i, 3, true).string(row.nombreEspecialidad).style(titulo1Style);
                worksheet.cell(5 + i, 1, 6 + i, 1, true).string('Fecha de Creación').style(table1Style);
                worksheet.cell(5 + i, 2).string('Desde').style(titulo1Style);
                worksheet.cell(5 + i, 3).string(req.body.fechaD).style(titulo1Style);
                worksheet.cell(6 + i, 2).string('Hasta').style(titulo1Style);
                worksheet.cell(6 + i, 3).string(req.body.fechaH).style(titulo1Style);

                worksheet.cell(8 + i, 1, 9 + i, 1, true).string('Oportunidades de mejora identificadas').style(table1Style);
                worksheet.cell(8 + i, 2, 9 + i, 2, true).string('Propuesta de mejora').style(table1Style);
                worksheet.cell(8 + i, 3, 9 + i, 3, true).string('Actividades').style(table1Style);
                worksheet.cell(8 + i, 4, 9 + i, 4, true).string('Estado').style(table1Style);

                worksheet.cell(8 + i, 5, 8 + i, 6, true).string('Duracion').style(table1Style);
                worksheet.cell(9 + i, 5).string('Inicio').style(table1Style);
                worksheet.cell(9 + i, 6).string('Fin').style(table1Style);


                worksheet.cell(8 + i, 7, 9 + i, 7, true).string('Responsables').style(table1Style);
                worksheet.cell(8 + i, 8, 9 + i, 8, true).string('Evidencia').style(table1Style);
                i++;
                planActual = row.idPlanMejora;
                propuestaActual = row.idPropuesta;
                filaPropuesta = i;
                filaInicial = i;
            }
            //console.log("escribiendo filas...")
            if (row.idPlanMejora != planActual) {
                //ya estoy en otro plan, así que me voy al row anterior a llenar los datos 
                //de las celdas combinadas, desde
                let rowAnterior = dataPlanMejora[l - 1];
                worksheet.cell(filaInicial + 9, 1, 9 + i - 1, 1, true).string(rowAnterior.oportunidadMejora).style(tableStyle);
                //la ultima propuesta
                worksheet.cell(filaPropuesta + 9, 2, 9 + i - 1, 2, true).string(rowAnterior.descripcionPropuesta).style(tableStyle);


                planActual = row.idPlanMejora;
                propuestaActual = row.idPropuesta;
                filaPropuesta = i;
                filaInicial = i;
            }
            //console.log("1) "+row.idPropuesta)
            if (planActual == row.idPlanMejora) {
                //console.log("2) "+ propuestaActual)
                if (propuestaActual != row.idPropuesta) {
                    //significa que cambie de propuesta y debo llenar la celda combinada de la propuesta anterior
                    //console.log("filaPropuesta: "+filaPropuesta);
                    //console.log("i: "+i);
                    let ultimo = dataPlanMejora[l - 1];
                    worksheet.cell(filaPropuesta + 9, 2, 9 + i - 1, 2, true).string(ultimo.descripcionPropuesta).style(tableStyle);
                    propuestaActual = row.idPropuesta;
                    filaPropuesta = i;
                }
                worksheet.cell(i + 9, 3).string(row.descripcionActividad).style(tableStyle);
                worksheet.cell(i + 9, 4).string(row.estadoActividad).style(tableStyle);
                (row.fechaInicio == null
                    ? worksheet.cell(i + 9, 5).string('-').style(tableStyle)
                    : worksheet.cell(i + 9, 5).date(row.fechaInicio).style(tableStyle)
                );
                (row.fechaFin == null
                    ? worksheet.cell(i + 9, 6).string('-').style(tableStyle)
                    : worksheet.cell(i + 9, 6).date(row.fechaFin).style(tableStyle)
                );
                worksheet.cell(i + 9, 7).string(row.responsableActividad).style(tableStyle);
                worksheet.cell(i + 9, 8).string(row.evidenciaActividad).style(tableStyle);
            }
            i++;
        }
        //sali del for, significa que me falta llenar la ultima propuesta y la ultima oportunidad
        let back = dataPlanMejora[n - 1];
        worksheet.cell(filaPropuesta + 9, 2, 9 + i - 1, 2, true).string(back.descripcionPropuesta).style(tableStyle);
        worksheet.cell(filaInicial + 9, 1, 9 + i - 1, 1, true).string(back.oportunidadMejora).style(tableStyle);


        function getFechaHoraActual() {
            const fechaHoraActual = new Date();

            // Obtener componentes de la fecha y hora
            const año = fechaHoraActual.getFullYear();
            const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0');
            const día = fechaHoraActual.getDate().toString().padStart(2, '0');
            const hora = fechaHoraActual.getHours().toString().padStart(2, '0');
            const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
            const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');

            // Formatear la fecha y hora
            const fechaHoraFormateada = `${día}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

            return fechaHoraFormateada;
        }
        const fechaHora = getFechaHoraActual();
        workbook.write('Reporte de Planes de Mejora ' + fechaHora + '.xlsx', res);
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