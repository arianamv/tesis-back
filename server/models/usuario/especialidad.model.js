const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Especialidad = function (idEspecialidad, fidFacultad, nombreEspecialidad, correo, codigoEspecialidad, activo, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.idEspecialidad = idEspecialidad;
    this.fidFacultad = fidFacultad;
    this.nombreEspecialidad = nombreEspecialidad;
    this.activo = activo;
    this.correo = correo;
    this.codigoEspecialidad = codigoEspecialidad;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
    this.mediciones = [];
}

Especialidad.insertarEspecialidad = (especialidad, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarEspecialidad(@result,?,?,?,?,?)";
    var value = [
        especialidad.nombreEspecialidad,
        especialidad.codigoEspecialidad,
        especialidad.fidFacultad,
        especialidad.correo,
        especialidad.usuarioCreacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de especialidad');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar la especialidad');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });
    });
};

Especialidad.listarEspecialidad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarEspecialidad(?,?)';
    var value = [
        datos.body.codigoNombreEspecialidad,
        datos.body.fidFacultad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de mediciones por idEspecialidad');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
};

Especialidad.listarUsuariosNoDeEspecialidad = (datos, result) => {
    const connection = getConnection.getConnection();
    const idList = (datos.body.idUsuarios).join(',');
    var sql = 'CALL ListarUsuariosNoDeEspecialidad(?,?,?)';
    var value = [
        datos.body.idEspecialidad, datos.body.codigo, idList
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar los usuarios');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Especialidad.deshabilitarEspecialidad = (especialidad, idAnulacion, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL DeshabilitarEspecialidad(?,?)';
    var value = [
        especialidad,
        idAnulacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo deshabilitar la especialidad');
            result(error, null);
            return;
        }
        result(null, true)
        return;

    })
};

Especialidad.mostrarDetalleEspecialidad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL MostrarDetalleEspecialidad(?)';
    var value = [
        datos.body.idEspecialidad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo mostrar el detalle de la especialidad');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
};

Especialidad.actualizarParametro = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ActualizarParametroEspecialidad(?,?,?,?,?)';
    var value = [
        datos.body.idEspecialidad,
        datos.body.niveles,
        datos.body.minimoAprobatorio,
        datos.body.porcentajeMinimo,
        datos.body.usuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo actualizar los parametros');
            result(error, null);
            return;
        }
        result(null, true)
        return;

    })
};

Especialidad.listarEspecialidadXFacultad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarEspecialidadesXFacultad(?)';
    var value = [
        datos.body.idFacultad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo mostrar el listado de especialidad');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
};

Especialidad.listarResEspecialidad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarResEspecialidad(?)';
    var value = [
        req.body.idEspecialidad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar los responsables de Especialidad');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

Especialidad.listarAsisEspecialidad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarAsisEspecialidad(?)';
    var value = [
        req.body.idEspecialidad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar los asistentes de Especialidad');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

Especialidad.insertarResponsable = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarPerfil(@result,?,?,?,2,?)";
    var value = [
        req.body.idUsuario,
        req.body.idEspecialidad,
        req.body.esAsistente,
        req.body.usuarioCreacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de responsable de especialidad');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar el responsable de especialidad');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });
    });
};

Especialidad.modificarEspecialidad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ModificarEspecialidad(?,?,?,?,?,?,@exito)';
    var value = [
        req.body.idEspecialidad,
        req.body.codigoEspecialidad,
        req.body.nombreEspecialidad,
        req.body.idFacultad,
        req.body.correo,
        req.body.usuarioModificacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo realizar la modificación de especialidad');
            result(error, null);
            return;
        }
        connection.query('SELECT @exito', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo modificar la especialidad');
                result(error, null);
                return;
            }

            //console.log("El id creado es " + results[0]['@exito'])
            result(null, results[0]['@exito'])
            return;
        });
    });
}

Especialidad.ReactivarEspecialidad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ReactivarEspecialidad(?,?)';
    const idList = (req.body.idEspecialidades).join(',');
    var value = [
        idList,
        req.body.usuarioModificacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo habilitar las especialidades');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

Especialidad.verificarParametrosExistentes = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL VerificarParametrosExistentes(?)';
    var value = [
        req.body.idEspecialidad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo verificar los parametros');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

module.exports = Especialidad;