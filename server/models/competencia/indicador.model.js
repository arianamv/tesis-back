const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Indicador = function (idIndicador, fidCompetencia, descripcion, niveles, minimoAprobatorio, codigo, activo, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.idIndicador = idIndicador;
    this.fidCompetencia = fidCompetencia;
    this.descripcion = descripcion;
    this.niveles = niveles;
    this.minimoAprobatorio = minimoAprobatorio;
    this.codigo = codigo;
    this.activo = activo;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;

    /* 
    this.rubricasIndicador = [];
    this.espacioMedicionIndicador = []; */
}

Indicador.insertarIndicador = async (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarIndicador(?,?,?,?,?,?)";
    var value = [
        datos.fidCompetencia,
        datos.descripcion,
        datos.niveles,
        datos.minimoAprobatorio,
        datos.codigo,
        datos.usuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Indicador');
            result(error, null);
            return;
        }
        console.log("El id creado es " + results[0][0]["ID"])
        result(null, results[0][0]["ID"])
        return;
        //  connection.query('SELECT @result', (error,results)=>{
        //     if(error){ 
        //         logger.log('error','No se pudo insertar el indicador.');
        //         result(error,null);
        //         return;
        //     }

        //         console.log("El id creado es "+ results[0]['@result'])
        //         result(null,results[0]['@result'])
        //     return;
        // });  

    });
}

Indicador.modificarIndicador = (indicador, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ModificarIndicador(?,?,?,?)';
    var value = [
        indicador.idIndicador,
        indicador.codigo,
        indicador.descripcion,
        indicador.usuarioModificacion,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo modificar el indicador');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

};

Indicador.listarIndicadorCompetencia = async (datos, result) => {
    const connection = await getConnection.getConnection();
    var sql = 'CALL ListarIndicadorCompetencia(?)';
    var value = [
        datos.body.fidCompetencia,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de indicadores por idCompetencia');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    });
}



Indicador.detalleIndicador = async (datos, result) => {
    const connection = await getConnection.getConnection();
    var sql = 'CALL DetalleIndicador(?)';
    var value = [
        datos.body.fidIndicador,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo mostrar la descripcion del indicador');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

Indicador.detalleIndicador = async (datos, result) => {
    const connection = await getConnection.getConnection();
    var sql = 'CALL DetalleIndicador(?)';
    var value = [
        datos.body.fidIndicador,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo mostrar la descripcion del indicador');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}


Indicador.eliminarIndicador = (datos, idAnulacion, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL EliminarIndicador(?,?)';
    var value = [
        datos,
        idAnulacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo eliminar el indicador');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

Indicador.listarIndicadorXCompetencia = async (req, datos, result) => {
    const value = [datos.map(datos => [datos.idIndicador])];
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_ind;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
        }
        console.log("Se borra Tabla");
        var sql1 = "CREATE TABLE temp_ind (idTemp int NOT NULL AUTO_INCREMENT,idIndicador int NOT NULL," +
            "PRIMARY KEY (idTemp));"
        connection.query(sql1, function (error) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
            }
            console.log("Se crea Tabla");
            var sql2 = 'INSERT IGNORE INTO temp_ind (idIndicador) VALUES ?';

            connection.query(sql2, value, function (error) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'CALL ListarCompetenciasIndicadores(?,?,?,?)';
                var value1 = [
                    req.body.codigoIndicador,
                    req.body.competencia,
                    req.body.idEspecialidad,
                    req.body.idMedicion
                ];
                connection.query(sql3, value1,function (error, results2) {
                    if (error) {
                        logger.log('error', 'No se pudo validar los alumnos' + error.stack);
                        return null;
                    }
                    console.log("Se inserta datos");
                    result(null, results2[0]);
                    var sql5 = 'DROP TABLE temp_ind;';
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
Indicador.agregarIndicadoresTodos = async (datos, result) => {
    const value = [datos.map(datos => [datos.idIndicador, datos.idEspacioMedicion,datos.evidencia, datos.idUsuarioCreacion])];
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Esp;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
        }
        console.log("Se borra Tabla");
        var sql1 = "CREATE TABLE temp_Esp (idTemp int NOT NULL AUTO_INCREMENT,idIndicador int NOT NULL,idEspacioMedicion int DEFAULT NULL, evidencia varchar(400), idUsuarioCreacion int NOT NULL," +
            "PRIMARY KEY (idTemp),UNIQUE KEY uc_codigo_medicion (idEspacioMedicion,idIndicador) /*!80000 INVISIBLE */);"
        connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
            }
            console.log("Se crea Tabla");
            var sql2 = 'INSERT IGNORE INTO temp_Esp (idIndicador,idEspacioMedicion,evidencia, idUsuarioCreacion) VALUES ?';

            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'call insertarIndicadorTodos();';
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

Indicador.eliminarIndicadoresTodos = async (datos, result) => {
    const value = [datos.map(datos => [datos.idIndicador, datos.idEspacioMedicion, datos.idUsuarioCreacion])];
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Esp;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
        }
        console.log("Se borra Tabla");
        var sql1 = "CREATE TABLE temp_Esp (idTemp int NOT NULL AUTO_INCREMENT,idIndicador int NOT NULL,idEspacioMedicion int DEFAULT NULL,idUsuarioCreacion int NOT NULL," +
            "PRIMARY KEY (idTemp));"
        connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
            }
            console.log("Se crea Tabla");
            var sql2 = 'INSERT IGNORE INTO temp_Esp (idIndicador,idEspacioMedicion,idUsuarioCreacion) VALUES ?';

            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                }
                console.log('Bulk insert realizado exitosamente.');
                var sql3 = 'call EliminarIndicadorTodos();';
                connection.query(sql3, function (error, results2) {
                    if (error) {
                        logger.log('error', 'No se pudo validar los alumnos' + error.stack);
                        return null;
                    }
                    console.log("Se elimina los datos");
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

Indicador.listarParametros = async (datos, result) => {
    const connection = await getConnection.getConnection();
    var sql = 'CALL ListarParametrosActualesIndicador(?,?)';
    var value = [
        datos.body.idEspecialidad,
        datos.body.idIndicador
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de parametros');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    });
}

module.exports = Indicador;
