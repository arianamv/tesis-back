const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const enviarCorreo = require('../cuenta/correo.model')

const EspacioMedicion = function (idEspacioMedicion, fidMedicion, codigo, nombreCurso, fechaLimite, tipoMedicion, indicadoresConfigurados, cicloAcademico, activo, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.idEspacioMedicion = idEspacioMedicion;
    this.fidMedicion = fidMedicion;
    this.codigo = codigo;
    this.nombreCurso = nombreCurso;
    this.fechaLimite = fechaLimite;
    this.tipoMedicion = tipoMedicion;
    this.indicadoresConfigurados = indicadoresConfigurados;
    this.cicloAcademico = cicloAcademico;
    this.activo = activo;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

EspacioMedicion.insertarEspacioMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarEspacioMedicion(@result,?,?,?,?,?,?,?)";
    var value = [
        datos.body.fidMedicion,
        datos.body.fidCicloAcademico,
        datos.body.codigo,
        datos.body.nombreCurso,
        datos.body.fechaLimite,
        datos.body.tipoMedicion,
        datos.body.usuarioCreacion
    ];// fecha en formato de cadena 
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Espacio de medicion');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar el espacio de medicion.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });

    });
}


EspacioMedicion.insertarEspacioMedicion2 = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarEspacioMedicion(?,?,?,?,?,?,?)";
    var value = [
        datos.fidMedicion,
        datos.cicloAcademico,
        datos.codigo,
        datos.nombreCurso,
        datos.fechaLimite,
        datos.tipoMedicion,
        datos.usuarioCreacion
    ];// fecha en formato de cadena 
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Espacio de medicion');
            result(error, null);
            return;
        }
        console.log("El id creado es " + results[0][0]["ID"])
        result(null, results[0][0]["ID"])
        return;
        // connection.query('SELECT @result', (error, results) => {
        //     if (error) {
        //         logger.log('error', 'No se pudo insertar el espacio de medicion.');
        //         result(error, null);
        //         return;
        //     }

        //     console.log("El id creado es " + results[0]['@result'])
        //     result(null, results[0]['@result'])
        //     return;
        // });

    });

}

EspacioMedicion.listarEspacioMedicionMuestras = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarMuestrasXEspacio(?)';
    var value = [datos.body.idEspacioMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de muestras por espacio de medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    });
}

EspacioMedicion.listarEspacioMedicionIndicadores = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarIndicadoresXEspacio(?)';
    var value = [datos.body.idEspacioMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de indicadores por espacio de medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    });
}


EspacioMedicion.insertarMedEspMuestra = async (datos, result) => {
    const value = [datos.map(datos => [datos.fidEspecialidad, datos.codigoMedicion, datos.cicloInicio, datos.cicloFin, datos.codigo, datos.nombreCurso, datos.fechaLimite,
    datos.tipoMedicion, datos.periodo, datos.horario, datos.codDocente, datos.fidIndicador, datos.evidencia,  datos.idUsuarioCreacion])];
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Med;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
        }
        console.log("Se borra Tabla");
        var sql1 = "CREATE TABLE temp_Med (idTemp int NOT NULL AUTO_INCREMENT,idMedicion int DEFAULT NULL,idEspacioMedicion int DEFAULT NULL,fidEspecialidad int DEFAULT NULL,cicloInicio int NOT NULL,cicloFin int NOT NULL,fidCicloAcademico int DEFAULT NULL," +
            "periodo varchar(10) NOT NULL,codigoMedicion varchar(10) NOT NULL,codigo varchar(10) NOT NULL,nombreCurso varchar(50) NOT NULL,fechaLimite date NOT NULL,tipoMedicion varchar(10) DEFAULT NULL," +
            "indicadoresConfigurados tinyint(1) DEFAULT NULL,fechaCreacion date NOT NULL,usuarioCreacion varchar(100) DEFAULT NULL,idUsuarioCreacion int NOT NULL," +
            "activo tinyint(1) DEFAULT NULL,horario varchar(10) NOT NULL,enviado tinyint(1) DEFAULT NULL,idPerfil int DEFAULT NULL,fidUsuario int DEFAULT NULL,esAuditor tinyint(1) DEFAULT NULL, esAdministrador tinyint(1) DEFAULT NULL, " +
            "nivelAcceso int DEFAULT NULL,fidMuestra int DEFAULT NULL,esAsistente int DEFAULT NULL,nombrePerfil varchar(60) DEFAULT NULL,profesor varchar(100) DEFAULT NULL," +
            "codDocente varchar(10) DEFAULT NULL,fidIndicador int NOT NULL,evidencia VARCHAR(400), PRIMARY KEY (idTemp),UNIQUE KEY uc_codigo_medicion (codigoMedicion,periodo,codigo,horario,fidIndicador) /*!80000 INVISIBLE */);"
         connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
            }
            console.log("Se crea Tabla");
             var sql2 = 'INSERT IGNORE INTO temp_Med (fidEspecialidad,codigoMedicion,cicloInicio,cicloFin,codigo,nombreCurso,fechaLimite,tipoMedicion,periodo,horario,codDocente,fidIndicador,evidencia,idUsuarioCreacion) VALUES ?';
            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'call ActualizarDatosTabla();';
                connection.query(sql3, function (error, results2) {
                    if (error) {
                        logger.log('error', 'No se pudo validar los alumnos' + error.stack);
                         return null;
                    }
                    //------> ya inserte los perfiles, ahora debo recuperar los datos del correo y de la muestra
                    // ----------------------------------------------------------------
                    // ----------------------------------------------------------------
                    // ----------------------------------------------------------------
                    //console.log('valores: ' + value);
                    console.log("Se inserta datos");
                    /*const value2 = [datos.map(datos => [
                        datos.horario,
                        datos.codDocente,
                        datos.nombreCurso
                    ])];
                    console.log("value 2: "+value2[0]);
                    for (let i = 0; i < value2[0].length; i++) {
                        //console.log(value2.map(datos => datos[i]));
                        //debo sacar los valores y llamar al query
                        console.log("general: "+value2[0][i])
                        var horario = value2[0][i][0];
                        var codDocente = value2[0][i][1];
                        var nombreCurso = value2[0][i][2];
                        
                        if((i>0 && ((value2[0][i-1][0]!=value2[0][i][0]) || (value2[0][i-1][1]!=value2[0][i][1]) || (value2[0][i-1][2]!=value2[0][i][2])))
                        || i == 0){
                            var texto = "Usted ha sido asignado como Responsable de Medición del horario "+
                            horario + " del curso "+nombreCurso+".";
                            console.log("HOLAAA: "+horario + " " + codDocente + " " + nombreCurso);
                            //var valores =[codDocente];
                            //funcion aqui
                            try{
                                const connection2 = getConnection.getConnection();
                                connection2.query("CALL correoCodigo(?,@correo)", codDocente, (error, results) => {
                                    if (error) {
                                        logger.log('error', 'Error: Matenme :(');
                                        result(error, null);
                                        return;
                                    }
                                    else{
                                        console.log(codDocente)
                                        connection2.query("select @correo", (error, results) => {
                                            if (error) {
                                                logger.log('error', 'Error: Matenme otra vez :(');
                                                result(error, null);
                                                return;
                                            }
                                            else{
                                                var correo = results[0]['@correo'];
                                                console.log(correo)
                                                enviarCorreo.enviarCorreo(correo,"Asignación de Rol en AcrediPUCP",texto);
                                                return;
                                            }
                                        })
                                    }
                                })
                            }catch (error) {
                                // Manejo de errores
                                console.error(error);
                                throw error;
                            }
                        }
                        
                        
                      }*/
                    // ----------------------------------------------------------------
                    // ----------------------------------------------------------------
                    // ----------------------------------------------------------------
                    // ----------------------------------------------------------------
                    console.log("results2[0][]");
                    console.log(results2[0][0]['dato']);
                    result(null, results2[0][0]['dato']);
                    var sql5 = 'DROP TABLE temp_Med;';
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


//-----------ADICIONAL-----------------

EspacioMedicion.enviarCorreosResponsables = async (datos, res) => {
    const connection2 = await getConnection.getConnection();
    console.log("datos de correos: " + datos);
  
    for (let i = 0; i < datos.horario.length; i++) {
      var texto =
        "Usted ha sido asignado como Responsable de Medición del horario " +
        datos.horario[i] +
        " del curso " +
        datos.nombreCurso[i] +
        ".";
      var codigoPUCP = datos.codDocente[i];
      console.log("HOLAAA: " + texto + " " + codigoPUCP);
  
      try {
        await new Promise((resolve, reject) => {
          connection2.query("CALL correoCodigo(?,@correo)", codigoPUCP, (error, results) => {
            if (error) {
              logger.log('error', 'No se pudo hacer el procedure doble');
              reject(error);
            } else {
              connection2.query('SELECT @correo', (error, results) => {
                if (error) {
                  logger.log('error', 'No se pudo hacer el procedure doble');
                  reject(error);
                } else {
                  console.log("acabo de leer " + results[0]["@correo"]);
                  console.log(codigoPUCP);
                  var correo = results[0]["@correo"];
                  console.log("enviando: " + correo + " " + texto);
                  enviarCorreo.enviarCorreo(
                    correo,
                    "Asignación de Rol en AcrediPUCP",
                    texto
                  );
                  resolve();
                }
              });
            }
          });
        });
      } catch (error) {
        // Manejo de errores
        console.error(error);
        throw error;
      }
    }
  }
/*
EspacioMedicion.enviarCorreosResponsables = async (datos, res) => {
    const value2 = datos.map((datos) => [datos.horario, datos.codDocente, datos.nombreCurso]);
    const connection2 = getConnection.getConnection();
    console.log("value 2: " + value2[0]);
    
    for (let i = 0; i < value2[0].length; i++) {
        console.log("general: " + value2[0][i]);
        var horario = value2[0][i][0];
        var codDocente = value2[0][i][1];
        var nombreCurso = value2[0][i][2];
        var correo;
    
        if (
            (i > 0 &&
            (value2[0][i - 1][0] != value2[0][i][0] ||
                value2[0][i - 1][1] != value2[0][i][1] ||
                value2[0][i - 1][2] != value2[0][i][2])) ||
            i == 0
        ) {
            var texto =
            "Usted ha sido asignado como Responsable de Medición del horario " +
            horario +
            " del curso " +
            nombreCurso +
            ".";
            console.log("HOLAAA: " + horario + " " + codDocente + " " + nombreCurso);
    
            try {
            const results = await new Promise((resolve, reject) => {
                connection2.query("CALL correoCodigo(?,@correo);", codDocente, (error, resultado) => {
                if (error) {
                    reject(error);
                } else {
                    connection2.query("SELECT @correo", (error, results)=>{
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                        
                    })
                }
                });
            });
            correo = results[0]["@correo"];
            console.log(correo + " " + texto);
            enviarCorreo.enviarCorreo(
                correo,
                "Asignación de Rol en AcrediPUCP",
                texto
            );
            } catch (error) {
            // Manejo de errores
            console.error(error);
            throw error;
            }
        }
    }
};*/
// arriba arriba arrib arriba arriba arriba arriba arriba
//-----------ADICIONAL--------------------------

EspacioMedicion.listarEspacioMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarEspaciosMedicion(?)';
    var value = [datos.body.fidMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de espacios de medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

////////////////////////// samantha

EspacioMedicion.ListarEspaciosUnaMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarEspaciosUnaMedicion(?)';
    var value = [datos.body.fidMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de espacios de medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}


EspacioMedicion.anadirEspacio = async (datos, result) => {
    const value = [datos.map(datos => [datos.idMedicion, datos.codigo, datos.nombreCurso, datos.fechaLimite,
    datos.tipoMedicion, datos.periodo, datos.horario, datos.codDocente, datos.fidIndicador, datos.evidencia, datos.idUsuarioCreacion])];
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Esp;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
            return null;
        }
        var sql1 = "CREATE TABLE temp_Esp (idTemp int NOT NULL AUTO_INCREMENT,idMedicion int NOT NULL,idEspacioMedicion int DEFAULT NULL, fidCicloAcademico int DEFAULT NULL," +
            "periodo varchar(10) NOT NULL, codigo varchar(10) NOT NULL,nombreCurso varchar(50) NOT NULL,fechaLimite date NOT NULL,tipoMedicion varchar(10) DEFAULT NULL," +
            "indicadoresConfigurados tinyint(1) DEFAULT NULL,fechaCreacion date NOT NULL,usuarioCreacion varchar(100) DEFAULT NULL,idUsuarioCreacion int NOT NULL," +
            "activo tinyint(1) DEFAULT NULL,horario varchar(10) NOT NULL,enviado tinyint(1) DEFAULT NULL,idPerfil int DEFAULT NULL,fidUsuario int DEFAULT NULL,esAuditor tinyint(1) DEFAULT NULL, esAdministrador tinyint(1) DEFAULT NULL, " +
            "nivelAcceso int DEFAULT NULL,fidMuestra int DEFAULT NULL,esAsistente int DEFAULT NULL,nombrePerfil varchar(60) DEFAULT NULL,profesor varchar(100) DEFAULT NULL," +
            "codDocente varchar(10) DEFAULT NULL,fidIndicador int NOT NULL, evidencia VARCHAR(400), PRIMARY KEY (idTemp),UNIQUE KEY uc_codigo_medicion (idMedicion,periodo,codigo,horario,fidIndicador) /*!80000 INVISIBLE */);"
        connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
                return null;
            }
            console.log("Se crea Tabla");
            var sql2 = 'INSERT IGNORE INTO temp_Esp (idMedicion,codigo,nombreCurso,fechaLimite,tipoMedicion,periodo,horario,codDocente,fidIndicador, evidencia, idUsuarioCreacion) VALUES ?';
            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                    return null;
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'call InsertarEspacioMedicionMasivo();';
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


EspacioMedicion.eliminarEspacio = async (datos, result) => {
    const value = [datos.map(datos => [datos.idMedicion, datos.idEspacioMedicion, datos.idUsuarioCreacion])];
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Esp;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
            return null;
        }
        var sql1 = "CREATE TABLE temp_Esp (idTemp int NOT NULL AUTO_INCREMENT,idMedicion int NOT NULL,idEspacioMedicion int DEFAULT NULL,idUsuarioCreacion int NOT NULL," +
            "PRIMARY KEY (idTemp));"
        connection.query(sql1, function (error) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
                return null;
            }
            console.log("Se crea Tabla");
            var sql2 = 'INSERT IGNORE INTO temp_Esp (idMedicion,idEspacioMedicion,idUsuarioCreacion) VALUES ?';

            connection.query(sql2, value, function (error) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                    return null;
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'call EliminarEspacioMedicionMasivo();';
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



EspacioMedicion.listarEspacioMedicionNombreCurso = async (datos, result) => {
    const connection = await getConnection.getConnection();
    var sql = 'CALL ListarEspaciosMedicionNombreCursoMedicion(?,?)';
    var value = [
        datos.body.fidMedicion,
        datos.body.nombreCurso
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de espacios de medicion por idMedicion o nombre del curso');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

EspacioMedicion.bucketInsert = async (datos, result) => {
    var cont = 0;
    const value = [datos.map(datos => [datos.codigo, datos.nombreCurso, datos.periodo, datos.fechaLimite, datos.horario, datos.codDocente, datos.profesor])];
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS tempCargaMasiva;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
            return null;
        }
        var sql1 = "CREATE TABLE tempCargaMasiva (codigo varchar(10) DEFAULT NULL, horario varchar(10) DEFAULT NULL," +
            "codDocente varchar(10) DEFAULT NULL,periodo varchar(10) DEFAULT NULL,nombreCurso varchar(50) DEFAULT NULL," +
            "fechaLimite date DEFAULT NULL,profesor varchar(100) DEFAULT NULL,mensaje varchar(100) DEFAULT NULL,idTemp int NOT NULL AUTO_INCREMENT," +
            "PRIMARY KEY (`idTemp`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci";
        connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo insertar alumno' + error.stack);
            }
            console.log("Se crea Tabla");
            var sql2 = 'INSERT INTO tempCargaMasiva (codigo,nombreCurso,periodo,fechaLimite,horario,codDocente,profesor) VALUES ?';
            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar alumno' + error.stack);
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'call ActualizaTablaValidacion();';
                connection.query(sql3, function (error, results) {
                    if (error) {
                        logger.log('error', 'No se pudo validar los alumnos' + error.stack);
                        return null;
                    }
                    console.log("Se evalua insertados");
                    var sql4 = 'SELECT distinct codigo,nombreCurso,periodo,fechaLimite,horario,codDocente,profesor,mensaje from tempCargaMasiva where mensaje is null;';
                    connection.query(sql4, function (error, results2) {
                        if (error) {
                            logger.log('error', 'No se pudo listar los alumnos' + error.stack);
                            return null;
                        }
                        console.log("Se entrega Tabla");
                        result(null, results2);
                        var sql5 = 'DROP TABLE tempCargaMasiva;';
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
    });
 }

EspacioMedicion.ListarEspaciosUnaMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarEspaciosUnaMedicion(?)';
    var value = [datos.body.fidMedicion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de espacios de medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

EspacioMedicion.modificarEspacio = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarEspacio(?,?,?,?,?,?)';
    var value = [
        datos.body.idEspacioMedicion,
        datos.body.codigoEspacio,
        datos.body.idCiclo,
        datos.body.descripcionEspacio,
        datos.body.fechaLimite,
        datos.body.idUsuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de espacios de medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    });
}

module.exports = EspacioMedicion;
