const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const envioCorreo = require('../cuenta/correo.model');
const Medicion = function (idMedicion, fidEspecialidad, codigo, cicloInicio, cicloFin, activo, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.idMedicion = idMedicion;
    this.fidEspecialidad = fidEspecialidad;
    this.codigo = codigo;
    this.cicloInicio = cicloInicio;
    this.cicloFin = cicloFin;
    this.activo = activo;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

/*agregarEspacioMedicion(espacioMedicion) {
    this.espaciosMedicion.push(espacioMedicion);
}

eliminarEspacioMedicion(espacioMedicion) {
    const index = this.espaciosMedicion.indexOf(espacioMedicion);
    if (index !== -1) {
        this.espaciosMedicion.splice(index, 1);
    }
}*/
Medicion.insertarMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarMedicion(@result,?,?,?,?,?)";
    var value = [
        datos.body.fidEspecialidad,
        datos.body.cicloInicio,
        datos.body.cicloFin,
        datos.body.codigo,
        datos.body.usuarioCreacion
    ];// fecha en formato de cadena 
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Medicion');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar la medicion.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });
    });
}

Medicion.insertarMedicion2 = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarMedicion(@result,?,?,?,?,?)";
    var value = [
        datos.fidEspecialidad,
        datos.cicloInicio,
        datos.cicloFin,
        datos.codigo,
        datos.usuarioCreacion
    ];// fecha en formato de cadena 
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Medicion');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar la medicion.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });
    });
}

//lista mediciones con el idEspecialidad
Medicion.listarMedicionEspecialidad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL listarMedicionesEspecialidad(?,?)';
    var value = [
        datos.body.fidEspecialidad,
        datos.body.codigo
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de mediciones por idEspecialidad');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

//lista mediciones con el codigo o nombre
Medicion.listarMedicionCodigoNombreEspecialidad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL listarMedicionesCodigoNombreEspecialidad(?)';
    var value = [datos.body.codigoNombreEspecialidad];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de mediciones por codigo o nombre de especialidad');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

Medicion.deshabilitarMedicion = (medicion, id, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL DeshabilitarPrograma(?,?)";
    var value = [
        medicion,
        id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo deshabilitar Medicion');
            result(error, null);
            return;
        }
        result(null, true)
        return;
    });
}

Medicion.mostrarDetalleMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL MostrarDetalleMedicion(?)";
    var value = [
        datos.body.idMedicion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo mostrar detalle de medicion');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Medicion.listarEspaciosMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarEspaciosMedicion(?)";
    var value = [
        datos.body.idMedicion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar espacios de medicion');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Medicion.reportesHistoricoMediciones = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ReporteHistoricoMediciones(?,?,?,?);';
    var value = [
        datos.body.periodo,
        datos.body.nivel,
        datos.body.codCurso,
        datos.body.idEspecialidad
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de resultados medicion');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

};
Medicion.modificarMedicionPeriodo = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarMedicionPeriodo(?,?,?,?)';
    var value = [
        datos.body.idCicloInicio,
        datos.body.idCicloFin,
        datos.body.idMedicion,
        datos.body.idUsuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de mediciones por idEspecialidad');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}


Medicion.reporteAlumnos = (idIndicador,idMuestraMedicion, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ReporteAlumnosNotas(?,?)';
    var value = [
        idMuestraMedicion,idIndicador
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de mediciones por idEspecialidad');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

Medicion.duplicarMedicion = (datos, result) => { //cualquier cambio aca se debe hacer en duplicarMedicion2
    const connection = getConnection.getConnection();
    var sql = 'CALL DuplicarMedicion(@result,@codigo,?,?,?,?,?,?)';
    var value = [
        datos.body.idMedicion,
        datos.body.fidEspecialidad,
        datos.body.codigo,
        datos.body.idCicloInicio,
        datos.body.fechaLimite,
        datos.body.idUsuarioCreacion
    ];
    console.log("value1")
    console.log(value);
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo duplicar medicion');
            result(error, null, null);
            return;
        }
        connection.query('SELECT @result, @codigo', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo duplicar medicion.');
                result(error, null, null);
                return;
            }
            console.log("aaaaaaaaaaaaaaaaaaa")
            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'], results[0]['@codigo'])
            return;
        });
    });
}

Medicion.duplicarMedicionIgnoring = (datos, result) => { //cualquier cambio aca se debe hacer en duplicarMedicion
    const connection = getConnection.getConnection();
    var sql = 'CALL DuplicarMedicionIgnoring(@result,@codigo,?,?,?,?,?,?)';
    var value = [
        datos.body.idMedicion,
        datos.body.fidEspecialidad,
        datos.body.codigo,
        datos.body.idCicloInicio,
        datos.body.fechaLimite,
        datos.body.idUsuarioCreacion
    ];
    console.log("value2")
    console.log(value);
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo duplicar medicion');
            result(error, null, null);
            return;
        }
        connection.query('SELECT @result, @codigo', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo duplicar medicion.');
                result(error, null, null);
                return;
            }
            
            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'], results[0]['@codigo'])
            return;
        });
    });
}

const enviarCorreoRecordatorioBatch = async (correos) => {
    for (let i = 0; i < correos.length; i++) {
        try {
            const correo = correos[i];
            const destino = correo.correo;
            var curso = correo.nombreCurso;
            var fechaLimite = correo.fechaLimite;
            var opcionesFormato = { day: '2-digit', month: '2-digit', year: 'numeric' };
            fechaLimite = fechaLimite.toLocaleDateString('es-PE', opcionesFormato);
            var codigoEspacio = correo.codigoEspacio;
            var horario = correo.codigoMuestra;
            //console.log("Bloque recibido: "+destino + " - " + curso + " - " + fechaLimite + " - " + codigoEspacio);
            const texto = 'Se le recuerda que tiene pendiente la medición del curso '+ curso +" ("+
            codigoEspacio +") - " + horario + " con fecha límite "+ fechaLimite +"."+"\n\n"+
            "Puede ingresar a través del sigueinte enlace: https://acredita.inf.pucp.edu.pe/";
            //console.log("ANTES DEL AWAIT");

            await envioCorreo.enviarCorreo(destino, "Tiene una Medición Pendiente", texto);

            //console.log("Correo enviado a: " + destino);
        } catch (error) {
            // Manejar el error adecuadamente, por ejemplo, registrar y reintentar más tarde.
            logger.log('error', error);
        }
    }
};

Medicion.enviarCorreosRecordatorios = async (fechaHoy, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarUsuariosMuestrasPendientes(?)";
    var value = [fechaHoy];

    try {
        await new Promise((resolve, reject) => {

            connection.query(sql, value, function (error, results) {
                if (error) {
                    logger.log('error', 'No se pudo realizar el listado de Mediciones pendientes para los recordatorios');
                    result(error, null);
                    return;
                }
                //TENGO TODOS LOS CORREOS 
                // Agrupar los correos en lotes
                const correosPorLotes = [];
                const tamañoLote = 10; // Define el tamaño del lote que quieres enviar
                for (let i = 0; i < results[0].length; i += tamañoLote) {
                    correosPorLotes.push(results[0].slice(i, i + tamañoLote));
                }

                // Procesar los lotes en secuencia
                correosPorLotes.reduce(async (previousPromise, currentBatch) => {
                    await previousPromise;
                    await enviarCorreoRecordatorioBatch(currentBatch);
                }, Promise.resolve());

                resolve();
        
                result(null, results[0]);
                return;
        
            });

        });
    } catch (error) {
        logger.log('error', error);
    }

    
}


module.exports = Medicion;