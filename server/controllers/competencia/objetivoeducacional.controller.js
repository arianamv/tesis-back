const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const ObjetivoEducacional = require('../../models/competencia/objetivoeducacional.model');
const logger = require('../../config/winston');
const { Console } = require('winston/lib/winston/transports');
const xl = require('excel4node');
const { Blob } = require('buffer');

exports.objetivoEducacionalInsertar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const objetivoEducacional = new ObjetivoEducacional(0, req.body.fidEspecialidad, req.body.sumilla, req.body.descripcion, req.body.codigoObjetivo, 1, decoded.id, decoded.id, decoded.id);
        db.ObjetivoEducacional.insertarObjetivoEducacional(objetivoEducacional, (err, idObjetivoEducacional) => {
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
                idObjetivoEducacional: idObjetivoEducacional,
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

exports.objetivoEducacionalDeshabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        //= new ObjetivoEducacional(req.body.idObjetivoEducacional,0, 0, 0, 0 ,0, decoded.id, decoded.id, decoded.id);

        for (let propiedad in req.body) {
            console.log("proces.." + propiedad)
            db.ObjetivoEducacional.anularObjetivoEducacional(propiedad, decoded.id, (err, data) => {
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
            //idObjetivoEducacional: idObjetivoEducacional,
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
/*
exports.objetivoEducacionalAnular = (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const objetivoEducacional = new ObjetivoEducacional(req.body.idObjetivoEducacional,0, 0, 0, 0 ,0, decoded.id, decoded.id, decoded.id);
        db.ObjetivoEducacional.anularObjetivoEducacional(objetivoEducacional, (err, data) => {
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
}
*/
exports.objetivoEducacionalModificar = (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);
        const objetivoEducacional = new ObjetivoEducacional(req.body.idObjetivoEducacional, 0, req.body.sumilla, req.body.descripcion, req.body.codigoObjetivo, 1, decoded.id, decoded.id, decoded.id);
        db.ObjetivoEducacional.modificarObjetivoEducacional(objetivoEducacional, (err, data) => {
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


exports.objetivoEducacionalListarHistorico = async (req, res) => {
    try {
    db.ObjetivoEducacional.listarHistoricoObjetivoEducacional(req, (err, dataObjetivo) => {
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
        const totalFilas = Object.keys(dataObjetivo).length
        const totalPaginas = Math.ceil(Object.keys(dataObjetivo).length / 10);
        const objetivos = dataObjetivo.slice(startIndex, endIndex);
        res.json({
            success: true,
            ObjetivoEducacional: objetivos,
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



exports.objetivoEducacionalListarActivos = async (req, res) => {
    try {
    db.ObjetivoEducacional.listarActivosObjetivoEducacional(req, (err, dataObjetivo) => {
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
        const totalFilas = Object.keys(dataObjetivo).length
        const totalPaginas = Math.ceil(Object.keys(dataObjetivo).length / 10);
        const objetivos = dataObjetivo.slice(startIndex, endIndex);
        res.json({
            success: true,
            ObjetivoEducacional: objetivos,
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

exports.objetivosEducacionalesReporte = async (req, res) => {
    try {
    db.ObjetivoEducacional.reporteObjetivos(req, (err, dataObjetivos) => {
        if (err) {
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }

        if (dataObjetivos.length == 0) {
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


        var n = dataObjetivos.length;
        var i = 0;

        for (let l = 0; l < n; l++) {
            let row = dataObjetivos[l];
            if (l >= n) break;
            if (i == 0) {
                //console.log("escribiendo encabezados...")
                var resp = row.nombreEspecialidad;
                worksheet = workbook.addWorksheet("Reporte");
                worksheet.column(1).setWidth(20);
                worksheet.column(2).setWidth(40);
                worksheet.column(3).setWidth(60);
                worksheet.column(4).setWidth(20);
                worksheet.column(5).setWidth(20);
                worksheet.column(6).setWidth(20);
                worksheet.column(7).setWidth(20);
                worksheet.column(8).setWidth(20);
                // Escribir la primera tabla en la hoja
                worksheet.cell(1, 1, 1, 9, true).string('REPORTE DE HISTÓRICO DE OBJETIVOS EDUCACIONALES').style(titulo2Style);

                worksheet.cell(3 + i, 1).string('Especialidad').style(titulo1Style);
                worksheet.cell(3 + i, 2, 3 + i, 3, true).string(row.codigoEspecialidad + ' - ' + row.nombreEspecialidad).style(titulo1Style);
                worksheet.cell(5 + i, 1, 6 + i, 1, true).string('Fecha de Creación').style(table1Style);
                worksheet.cell(5 + i, 2).string('Desde').style(titulo1Style);
                worksheet.cell(5 + i, 3).string(req.body.fechaD).style(titulo1Style);
                worksheet.cell(6 + i, 2).string('Hasta').style(titulo1Style);
                worksheet.cell(6 + i, 3).string(req.body.fechaH).style(titulo1Style);

                worksheet.cell(8 + i, 1).string('Código').style(table1Style);
                worksheet.cell(8 + i, 2).string('Sumilla').style(table1Style);
                worksheet.cell(8 + i, 3).string('Objetivo Educacional').style(table1Style);
                worksheet.cell(8 + i, 4).string('Usuario Creación').style(table1Style);
                worksheet.cell(8 + i, 5).string('Fecha de Creación').style(table1Style);
                worksheet.cell(8 + i, 6).string('Usuario Deshabilitación').style(table1Style);
                worksheet.cell(8 + i, 7).string('Fecha de Deshabilitación').style(table1Style);
                worksheet.cell(8 + i, 8).string('Activo').style(table1Style);
                i++;
            }
            if (resp != row.nombreEspecialidad) {
                //console.log("escribiendo encabezados...")
                i = 0;
                worksheet = workbook.addWorksheet("Reporte");
                worksheet.cell(1, 1, 1, 9, true).string('REPORTE DE HISTÓRICO DE OBJETIVOS EDUCACIONALES').style(titulo2Style);
                resp = row.nombreEspecialidad;

                worksheet.cell(3 + i, 1).string('Especialidad').style(titulo1Style);
                worksheet.cell(3 + i, 2, 3 + i, 3).string(row.codigoEspecialidad + ' - ' + row.nombreEspecialidad).style(titulo1Style);
                worksheet.cell(5 + i, 1, 6 + i, 1, true).string('Fecha de Creación').style(table1Style);
                worksheet.cell(5 + i, 2).string('Desde').style(titulo1Style);
                worksheet.cell(5 + i, 3).string(req.body.fechaD).style(titulo1Style);
                worksheet.cell(6 + i, 2).string('Hasta').style(titulo1Style);
                worksheet.cell(6 + i, 3).string(req.body.fechaH).style(titulo1Style);

                worksheet.cell(8 + i, 1).string('Código').style(table1Style);
                worksheet.cell(8 + i, 2).string('Sumilla').style(table1Style);
                worksheet.cell(8 + i, 3).string('Objetivo Educacional').style(table1Style);
                worksheet.cell(8 + i, 4).string('Usuario Creación').style(table1Style);
                worksheet.cell(8 + i, 5).string('Fecha de Creación').style(table1Style);
                worksheet.cell(8 + i, 6).string('Usuario Deshabilitación').style(table1Style);
                worksheet.cell(8 + i, 7).string('Fecha de Deshabilitación').style(table1Style);
                worksheet.cell(8 + i, 8).string('Activo').style(table1Style);
                i++;
            }

            //console.log("escribiendo filas...")
            worksheet.cell(i + 8, 1).string(row.codigoObjetivo).style(tableStyle);
            worksheet.cell(i + 8, 2).string(row.sumilla).style(tableStyle);
            worksheet.cell(i + 8, 3).string(row.descripcion).style(tableStyle);
            worksheet.cell(i + 8, 4).string(row.nombreUsuarioCreacion).style(tableStyle);
            worksheet.cell(i + 8, 5).date(row.fechaCreacion).style(tableStyle);
            if (row.nombreUsuarioAnulacion == null || row.fechaAnulacion == null) {
                worksheet.cell(i + 8, 6).string('-').style(tableStyle);
                worksheet.cell(i + 8, 7).string('-').style(tableStyle);
            }
            else {
                worksheet.cell(i + 8, 6).string(row.nombreUsuarioAnulacion).style(tableStyle);
                worksheet.cell(i + 8, 7).date(row.fechaAnulacion).style(tableStyle);
            }
            if (row.activo == 1) worksheet.cell(i + 8, 8).string('Activo').style(tableStyle);
            else worksheet.cell(i + 8, 8).string('Inactivo').style(tableStyle);
            i++;
        }
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
        workbook.write('Reporte histórico de Objetivos Educacionales ' + fechaHora + '.xlsx', res);
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

