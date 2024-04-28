const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Actividad = function (idActividad, idPropuesta, codigo, descripcion, evidencia, responsable, fidEstado, activo, usuarioCreacion, usuarioModificacion, usuarioAnulacion) {
    this.idActividad = idActividad;
    this.idPropuesta = idPropuesta;
    this.fidEstado = fidEstado;
    this.codigo = codigo;
    this.evidencia = evidencia;
    this.responsable = responsable;
    this.descripcion = descripcion;
    this.activo = activo;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

Actividad.listarActividad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarActividadXIdPropuesta(?)";
    var value = [datos.body.idPropuesta];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de una Actividad para ese ID');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}
Actividad.listarActividad2 = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarActividadXIdActividad(?)";
    var value = [datos.body.idActividad];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de una Actividad para ese ID');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

Actividad.insertarActividad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL InsertarActividad(@result,?,?,?,?,?,?,?)';
    var value = [
        datos.idPropuesta,
        datos.codigo,
        datos.descripcion,
        datos.fidEstado,
        datos.evidencia,
        datos.responsable,
        datos.usuarioCreacion,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Actividad');
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

    })
}
Actividad.modificarActividad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ModificarActividad(?,?,?,?,?,?,?)";
    var value = [
        datos.idActividad,
        datos.codigo,
        datos.descripcion,
        datos.evidencia,
        datos.responsable,
        datos.fidEstado,
        datos.usuarioModificacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo modificar la rubrica');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

}
Actividad.eliminarActividad = (datos, idAnulacion, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL EliminarActividad(?,?)';
    var value = [
        datos,
        idAnulacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo eliminar la actividad');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}


Actividad.insertarEvidencia2 = (idActividad, _nombreArchivo, result) => {
    const connection = getConnection.getConnection();
    console.log(_nombreArchivo)
    var sql = 'CALL RegistrarEvidenciaActividad(?,?)';
    var value = [
        idActividad,
        _nombreArchivo
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción la evidencia 2');
            result(error, null);
            return;
        }
        console.log("El id creado es " + results[0][0]["ID"])
        result(null, results[0][0]["ID"])
        return;
    })
};



Actividad.listarEvidencias = (idActividad, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ListarEvidenciasActividades(?);';
    var value = [
        idActividad
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

Actividad.eliminarEvidencias = (idDetalleEvidenciaActividad, fidActividad, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call EliminarEvidenciaActividades(?,?);';
    var value = [
        idDetalleEvidenciaActividad,
        fidActividad
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

module.exports = Actividad;
