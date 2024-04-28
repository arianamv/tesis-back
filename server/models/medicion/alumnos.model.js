const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Alumno = function (idAlumno, nombre, codigo, usuarioCreacion, activo) {
    this.idAlumno = idAlumno;
    this.nombre = nombre;
    this.codigo = codigo;
    this.usuarioCreacion = usuarioCreacion;
    this.activo = activo;
}


Alumno.insertarAlumnoMuestra = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarAlumnosMuestra(@result,?,?,?)";
    var value = [
        datos.body.idAlumno,
        datos.body.idMuestraMedicion,
        datos.body.usuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de alumno x muestra');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo asignar el alumno a una muestra.');
                result(error, null);
                return;
            }
            //console.log('hola')
            //console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });

    });
}

Alumno.listarAlumnosMuestra = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarAlumnosDeMuestra(?,?)';
    var value = [
        req.body.codigoNombre,
        req.body.idMuestraMedicion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar los alumnos');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}


Alumno.insertarAlumno = async (datos, result) => {
    console.log(datos.lenght);
    const value = [datos.map(datos => [datos.fidMuestraMedicion, datos.codigo, datos.nombre, datos.idUsuarioCreacion])];
    console.log(value);
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Alumno;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
        }
        console.log("Se borra Tabla");
        var sql1 = "CREATE TABLE temp_Alumno (idTemp int NOT NULL AUTO_INCREMENT,idAlumno int DEFAULT NULL,codigo varchar(10) NOT NULL,nombre varchar(200) NOT NULL," +
            "activo tinyint(1) DEFAULT NULL,idUsuarioCreacion int NOT NULL,fidMuestraMedicion int NOT NULL,PRIMARY KEY (idTemp),UNIQUE KEY uc_codigo (codigo));"
        connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
            }
            console.log("Se crea Tabla");

            var sql2 = "INSERT IGNORE INTO temp_Alumno (fidMuestraMedicion,codigo,nombre,idUsuarioCreacion) VALUES ?";
            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                }

                console.log('Bulk insert realizado exitosamente.');
                //para llenar tablas de alumnos y indicadores
                var sql3 = 'call ActualizarDatosAlumnos();';
                connection.query(sql3, function (error, results2) {
                    if (error) {
                        logger.log('error', 'No se pudo validar los alumnos' + error.stack);
                        return null;
                    }
                    console.log("Se inserta datos");
                    result(null, results2[0]);
                    var sql5 = 'DROP TABLE temp_Alumno;';
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

Alumno.alumnoEliminar = async (datos, result) => {
    const value = [datos.map(datos => [datos.fidMuestraMedicion,datos.idAlumno,datos.idUsuarioCreacion])];
    console.log(value);
    const connection = await getConnection.getConnection();
    var sqld = "DROP TABLE IF EXISTS temp_Alumno2;";
    connection.query(sqld, function (error) {
        if (error) {
            logger.log('error', 'No se pudo borrar tabla' + error.stack);
        }
        console.log("Se borra Tabla");
        var sql1 = "CREATE TABLE temp_Alumno2 (idTemp int NOT NULL AUTO_INCREMENT,idAlumno int NOT NULL," +
            "idUsuarioCreacion int NOT NULL,fidMuestraMedicion int NOT NULL,PRIMARY KEY (idTemp));"
        connection.query(sql1, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo crear tabla' + error.stack);
            }
            console.log("Se crea Tabla");

            var sql2 = "INSERT IGNORE INTO temp_Alumno2 (fidMuestraMedicion,idAlumno,idUsuarioCreacion) VALUES ?";
            connection.query(sql2, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo insertar' + error.stack);
                }

                console.log('Bulk insert realizado exitosamente.');
                //para llenar tablas de alumnos y indicadores
                var sql3 = 'call EliminarAlumnosDeMuestra();';
                connection.query(sql3, function (error, results2) {
                    if (error) {
                        logger.log('error', 'No se pudo validar los alumnos' + error.stack);
                        return null;
                    }
                    console.log("Se inserta datos");
                    result(null, results2[0]);
                    var sql5 = 'DROP TABLE temp_Alumno2;';
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

module.exports = Alumno;
