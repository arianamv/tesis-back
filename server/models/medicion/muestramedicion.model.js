const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const envioCorreo = require('../cuenta/correo.model');

const MuestraMedicion = function (idMuestraMedicion, fidEspacioMedicion, codigo, codigoResponsable, activo, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.idMuestraMedicion = idMuestraMedicion;
    this.fidEspacioMedicion = fidEspacioMedicion;
    this.codigo = codigo;
    this.codigoResponsable = codigoResponsable;
    this.activo = activo;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

MuestraMedicion.insertarMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarMuestraMedicion(@result,?,?,?)";
    var value = [
        datos.body.fidEspacioMedicion,
        datos.body.codigo,
        datos.body.usuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Muestra de Medicion');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar la muestra de medicion.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });

    });
}
MuestraMedicion.insertarMuestraMedicion2 = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarMuestraMedicion(@result,?,?,?,?)";
    var value = [
        datos.fidEspacioMedicion,
        datos.codigo,
        datos.usuarioCreacion,
        datos.codigoResponsable
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Muestra de Medicion');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar el Rubrica.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });


    });
}

MuestraMedicion.listarHistoricoMuestraMedicionUsuario = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarHistoricoMedicionesUsuario(?,?)";
    var value = [datos.body.idUsuario, datos.body.EspacioMedicionDescripcion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Historico de Mediciones de un usuario');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.listarMuestraMedicionUsuario = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarMedicionesUsuario(?,?)";
    var value = [datos.body.idUsuario, datos.body.codigo];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Mediciones de un usuario');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

/*MuestraMedicion.enviarMuestraMedicion = (datos,result)=>{
    const connection = getConnection.getConnection();
    var sql = "CALL EnviarMuestraMedicion(?)";
    var value = [datos.body.idMuestraMedicion];
    connection.query(sql,value,function(error,results){
        if(error) {
            logger.log('error','No se pudo realizar el envío de la muestra de medición');
            result(error,null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null,true)
        return;
    })
}*/

MuestraMedicion.mostrarDetalleMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL MostrarDetalleMuestraMedicion(?)";
    var value = [datos.body.idMuestraMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo mostrar los detalles de la muestra de medición');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        console.log(results[0]);
        return;
    })
}

MuestraMedicion.listarIndicadoresMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarIndicadoresXMuestraMedicion(?)";
    var value = [datos.body.idMuestraMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los indicdores de la muestra de medición');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}
//manhana debo hacer que el data de la muestra medicion envie tambien un arregle de json con los datos de indicadores

MuestraMedicion.listarCompetenciasMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarCompetenciaxMuestraMedicion(?)";
    var value = [datos.body.idMuestraMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar las competencias de la muestra de medición');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.listarIndicadoresCompetenciasMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarIndicadoresXCompetenciaxMuestraMedicion(?,?)";
    var value = [datos.body.idMuestraMedicion, datos.body.idCompetencia];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los indicadores de la competencia de la muestra de medición');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.listarMedicionesUsuarioNombreCodigoEspacio = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarMedicionesUsuarioNombreCodigoEspacio(?,?)";
    var value = [datos.body.idUsuario, datos.body.nombreCodigoEspacio];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar las muestras de medición del usuario');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.insertarAlumnoMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarAlumnoMuestraMedicion(?,?,?,?)";
    var value = [
        datos.body.nombreAlumno,
        datos.body.codigoAlumno,
        datos.body.idMuestraMedicion,
        datos.body.usuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo insertar el alumno');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.listarAlumnosIndicadorMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarAlumnosIndicadorXMuestraMedicion(?)";
    var value = [
        datos.body.idIndicadorEspacioXMuestraMedicion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los alumnos del indicador dado');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.insertarNotaAlumnoMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarNotaAlumno(?,?)";
    var value = [
        datos.body.idResultadoIndicador,
        datos.body.nota
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo insertar la nota del alumno');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.listarAlumnosMuestra2 = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarAlumnosMuestra(?)";
    var value = [
        datos.body.idMuestraMedicion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los alumnos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.listarIndicadoresXcomptenciXMuestra2 = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarIndicadoresXCompetenciaxMuestraMedicion(?,?)";
    var value = [
        datos.body.idMuestraMedicion,
        datos.body.idCompetencia
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los indicadores');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.asignarNotaMuestra2 = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarNotaAlumno2(?,?)";
    var value = [
        datos.idAlumnosMuestra,
        datos.resultados
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo insertar el resultado');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}


MuestraMedicion.listarTodoIndicaroresMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarTodoIndicadoresXMuestra(?)";
    var value = [
        datos.body.idMuestraMedicion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los indicadores');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}


MuestraMedicion.registarResumenIndicadorXMuestraMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL RegistrarResumenIndicadorXMuestra(?,?,?,?,?)";
    var value = [
        datos.body.fidMuestraMedicion,
        datos.body.fidIndicador,
        datos.body.promedio,
        datos.body.porcentaje,
        datos.body.totalesCumplidos
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo registar el resumen de IndicadorXMuestraMedicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.reporteResultadoGeneral = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ReporteResultadosGeneral(?,?,?,?);';
    var value = [
        datos.body.periodoI,
        datos.body.periodoF,
        datos.body.codCurso,
        datos.body.idEspecialidad
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de resultados general');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

};


MuestraMedicion.listarCicloAcademico = (pI, pF, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ListarCicloAcademico(?,?);';
    var value = [
        pI,
        pF
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listar los ciclos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return result;

    })

};



MuestraMedicion.enviarMuestra2 = (req, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call EnviarMuestraMedicion(?,?);';
    var value = [
        req.body.idMuestraMedicion,
        req.body.usuarioModificacion
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el envío de la muestra');
            result(error, null);
            return;
        }
        //enviando correo
        var texto = (results[0][0]['usuarioMuestra'] + " ha terminado una medición correspondiente a: " +
            "\nCódigo de medición: " + results[0][0]['codigoMedicion'] +
            "\nCurso: " + results[0][0]['codigoEspacio'] + " " + results[0][0]['nombreEspacio'] +
            "\nHorario: " + results[0][0]['codigoMuestra']);
        console.log(texto)
        //obtengo todos los correos
        let correos = "";
        for (let i = 0; i < results[0].length; i++) {
            correos += results[0][i]['correo'];
            if (i !== results[0].length - 1) {
                correos += ", ";
            }
        }
        console.log("Correos de los responsables de ESPECIALIDAD: " + correos)
        envioCorreo.enviarCorreo(correos, "Registro de resultados de medición", texto);
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return result;

    })

};

MuestraMedicion.reporteSeguimientoDeMuestras = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ReporteSeguimientoDeMuestras(?,?,?,?);';
    var value = [
        datos.body.fidEspecialidad,
        datos.body.estado,
        datos.body.fechaD,
        datos.body.fechaH
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el reporte de seguimiento de muestras de medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

};

MuestraMedicion.listarEvidencias = (idCompetencia, idMuestra, idIndicador, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ListarEvidencias(?,?,?);';
    var value = [
        idCompetencia,
        idMuestra,
        idIndicador
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listar las evidencias');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return result;
    })
};

MuestraMedicion.eliminarEvidencias = (idDetalleCompetenciaXMuestra, fidCompetenciaXMuestraint, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call EliminarEvidencia(?,?);';
    var value = [
        idDetalleCompetenciaXMuestra,
        fidCompetenciaXMuestraint,
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo eliminiar las evidencias');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return result;
    })
};

MuestraMedicion.listarMuestraMedicionEspecialidad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarMuestrasMedicionesEspecialidad(?,?)";
    var value = [datos.body.idEspecialidad, datos.body.espacioMedicionResponsable];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Mediciones de un usuario');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

MuestraMedicion.insertarMuestraMedicionTodos = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL insertarMuestraMedicionTodos(?,?,?,?)";
    var value = [
        datos.body.idEspacioMedicion,
        datos.body.horario,
        datos.body.codDocente,
        datos.body.idUsuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo insertar el alumno');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        else{
            //busco los datos
            var sql2 = "CALL DatosHorarioDocente(?,?,?,@correo,@texto)";
            var value2 = [
                datos.body.idEspacioMedicion,
                datos.body.horario,
                datos.body.codDocente
            ];

            connection.query(sql2, value2, function (error, results) {
                if (error) {
                    logger.log('error', 'No se encontraron los datos del docente');
                    result(error, null);
                    return;
                }
                else{
                    connection.query("SELECT @correo, @texto",  (error, results) => {
                        if (error) {
                            logger.log('error', 'No se encontraron los datos del docente 2');
                            result(error, null);
                            return;
                        }
                        else{
                            var texto = results[0]['@texto'] + ". \n \nEnlace a AcrediPUCP: https://acredita.inf.pucp.edu.pe/";
                            var correo = results[0]['@correo'];
                            //console.log(texto + "\n" +correo); si los jala bien
                            envioCorreo.enviarCorreo(correo,"Asignación de Rol en AcrediPUCP",texto);
                        }
                    })
                }
            })

            result(null, results[0])
            return;
        }
        
    })
}

MuestraMedicion.eliminarMuestrasMedicionTodos = async (datos, result) => {
    const value = [datos.map(datos => [datos.idMuestra, datos.idEspacioMedicion, datos.idUsuarioCreacion])];
    console.log("AQUI ESTA EL VALUE");
    console.log(value);
    console.log("AQUI ESTA EL VALUE");
    console.log(value);
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Esp;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
        }
        console.log("Se borra Tabla");
        var sql1 = "CREATE TABLE temp_Esp (idTemp int NOT NULL AUTO_INCREMENT,idMuestra int NOT NULL,idEspacioMedicion int DEFAULT NULL,idUsuarioCreacion int NOT NULL," +
            "PRIMARY KEY (idTemp));"
        connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
            }
            console.log("Se crea Tabla");
            var sql2 = 'INSERT IGNORE INTO temp_Esp (idMuestra,idEspacioMedicion,idUsuarioCreacion) VALUES ?';

            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'call EliminarMuestraMasivo();';
                connection.query(sql3, function (error, results2) {
                    if (error) {
                        logger.log('error', 'No se pudo validar los alumnos' + error.stack);
                        return null;
                    }
                    console.log("Se inserta datos");
                    result(null, results2[0]);
                    var sql5 = 'DROP TABLE temp_Esp;';
                    connection.query(sql5, function (error, results) {
                        if (error) {
                            logger.log('error', 'No se pudo listar los alumnos' + error.stack);
                            return null;
                        }
                        console.log("Se  borra tabla");
                        return;
                    });
                });
            });
        });
    });
}

MuestraMedicion.ModificarResponable = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL modificarResponsableMedicion(?,?,?)";
    var value = [datos.body.idMuestra, datos.body.idResponsable, datos.body.idUsuarioCreacion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la modificación');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

module.exports = MuestraMedicion;
