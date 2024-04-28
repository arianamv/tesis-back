const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Facultad = function (idFacultad, nombreFacultad, tieneEspecialidad, codigoFacultad, correo, activo, usuarioCreacion, usuarioModificacion, usuarioAnulacion) {
    this.idFacultad = idFacultad;
    this.nombreFacultad = nombreFacultad;
    this.tieneEspecialidad = tieneEspecialidad;
    this.codigoFacultad = codigoFacultad;
    this.correo = correo;
    this.activo = activo;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioAnulacion = usuarioAnulacion;
    this.especialidades = [];
}

Facultad.insertarFacultad = (facultad, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL InsertarFacultad(@result,?,?,?,?,?)';
    var value = [
        facultad.nombreFacultad,
        facultad.codigoFacultad,
        facultad.tieneEspecialidad,
        facultad.correo,
        facultad.usuarioCreacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de facultad');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar la Facultad.');
                result(error, null);
                return;
            }
            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
        });
    });
}

Facultad.mostrarDetalleFacultad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL MostrarDetalleFacultad(?)';
    var value = [
        req.body.idFacultad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo mostrar el detalle de la facultad');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Facultad.listarFacultad = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarFacultad(?)';
    var value = [
        datos.body.codigoNombreFacultad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de facultades');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Facultad.eliminarEspecialidad = (especialidad) => {
    const index = this.especialidades.indexOf(especialidad);
    if (index !== -1) {
        this.especialidades.splice(index, 1);
    }
}

Facultad.asignarResponsable = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL InsertarResponsableFacultad(@result,?,?,?,?)';
    var value = [
        req.body.idUsuario,
        req.body.idFacultad,
        req.body.esAsistente,
        req.body.usuarioCreacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo asignar el responsable de facultad');
            result(error, null);
            return;
        }
        connection.query('SELECT @result, @idPerfil', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo asignar el responsable para la Facultad.');
                result(error, null);
                return;
            }
            if (results[0]['@result'] == 0) {
                results[0]['@idPerfil'] = 0;
            }
            console.log("El id creado es " + results[0]['@idPerfil'])
            result(null, results[0]['@idPerfil'])
        });
    });
}

Facultad.listarUsuariosQueNoSonFacultad = (req, result) => {
    const connection = getConnection.getConnection();
    const idList = (req.body.idUsuarios).join(',');
    var sql = 'CALL ListarUsuariosQueNoSonDeFacultad(?,?,?)';
    var value = [
        req.body.idFacultad, req.body.codigo, idList
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

Facultad.deshabilitarResponsable = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL DeshabilitarResponsableFacultad(?,?,?)';
    var value = [
        req.body.idUsuario,
        req.body.idFacultad,
        req.body.usuarioAnulacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo deshabilitar al responsable de Facultad');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Facultad.modificarFacultad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ModificarFacultad(?,?,?,?,?,?)';
    var value = [
        req.body.idFacultad,
        req.body.nombreFacultad,
        req.body.codigoFacultad,
        req.body.tieneEspecialidad,
        req.body.correo,
        req.body.usuarioModificacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo modificar la facultad');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Facultad.listarResFacultad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarResFacultad(?)';
    var value = [
        req.body.idFacultad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar los responsables de Facultad');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

Facultad.listarAsisFacultad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarAsisFacultad(?)';
    var value = [
        req.body.idFacultad
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar los asistentes de Facultad');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

Facultad.habilitarFacultad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL HabilitarFacultad(?,?)';
    const idList = (req.body.idFacultades).join(',');
    var value = [
        idList,
        req.body.usuarioModificacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo habilitar las facultades');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

Facultad.deshabilitarFacultad = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL DeshabilitarFacultad(?,?)';
    const idList = (req.body.idFacultades).join(',');
    var value = [
        idList,
        req.body.usuarioAnulacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo deshabilitar las facultades');
            result(error, null);
            return;
        }
        result(null, results[0]);
        return;
    });
}

module.exports = Facultad;