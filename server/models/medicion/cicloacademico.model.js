const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const CicloAcademico = function (idCicloAcademico, anio, semestre, nombre, fechaInicio, fechaFin, activo, usuarioCreacion, usuarioModificacion, usuarioAnulacion) {
    this.idCicloAcademico = idCicloAcademico;
    this.anio = anio;
    this.semestre = semestre;
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.activo = activo;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

CicloAcademico.insertarCicloAcademico = (ciclo, result) => {
    const connection = getConnection.getConnection();

    var sql = "CALL InsertarCicloAcademico(@result,?,?,?,?,?)";
    var value = [
        ciclo.anio,
        ciclo.semestre,
        ciclo.fechaInicio,
        ciclo.fechaFin,
        ciclo.usuarioCreacion
    ];// fecha en formato de cadena 
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Ciclo academico');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar el ciclo academico.');
                result(error, null);
                return;
            }

            //console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });
    })
}

CicloAcademico.modificarCicloAcademico = (ciclo, result) => {
    const connection = getConnection.getConnection();

    var sql = "CALL ModificarCicloAcademico(?,?,?,?,?,?)";
    var value = [
        ciclo.idCicloAcademico,
        ciclo.anio,
        ciclo.semestre,
        ciclo.fechaInicio,
        ciclo.fechaFin,
        ciclo.ususarioModificacion
    ];// fecha en formato de cadena 
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo modificar el ciclo academico');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    })
}

CicloAcademico.deshabilitarCicloAcademico = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL DeshabilitarCiclos(?,?)';
    const idList = (req.body.idCicloAcademicos).join(',');
    var value = [
        idList,
        req.body.usuarioAnulacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo deshabilitar el ciclo academico');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

CicloAcademico.listarCicloAcademico = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ListarTodoCicloAcademico()';
    var value = datos.body;
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de todos los ciclos academicos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })
}

CicloAcademico.listarCicloAcademicoTodos = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ListarCicloAcademicoTodos()';
    var value = datos.body;
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de todos los ciclos academicos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })
}

CicloAcademico.listarCicloAcademicoDupMedicion = (datos, result) => {
    const connection = getConnection.getConnection();
    
    var sql = 'CALL ListarCicloAcademicoDupMedicion(?)';
    var value = datos.body.idMedicion;
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de todos los ciclos academicos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

CicloAcademico.ListarCicloAcademicoDesdeHastaNombrePag = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ListarCicloAcademicoDesdeHastaNombrePag(?,?,?)';
    var value = [
        datos.body.codigoDescripcion,
        datos.body.fechaIni,
        datos.body.fechaFin
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de todos los ciclos academicos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })
}

CicloAcademico.listarCicloAcademicoDesde = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarCicloAcademicoDesde(?,?)';
    var value = [
        datos.body.anio,
        datos.body.semestre
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado desde un ciclo académico');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

CicloAcademico.listarCicloAcademicoHasta = (datos, result) => {

    const connection = getConnection.getConnection();
    var sql = 'CALL ListarCicloAcademicoHasta(?,?)';
    var value = [
        datos.body.anio,
        datos.body.semestre
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado hasta un ciclo académico');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });

}

CicloAcademico.listarCicloAcademicoDesdeHasta = (datos, result) => {

    const connection = getConnection.getConnection();
    var sql = 'CALL ListarCicloAcademicoDesdeHasta(?,?,?,?)';
    var value = [
        datos.body.anio1,
        datos.body.semestre1,
        datos.body.anio2,
        datos.body.semestre2
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado desde un ciclo hasta un ciclo académico');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });

}

module.exports = CicloAcademico;