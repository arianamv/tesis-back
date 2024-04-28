const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const Reportes = function (fidEspecialidad, idCompetencia, codigo, descripcion, evidencia, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.fidEspecialidad = fidEspecialidad;
    this.idCompetencia = idCompetencia;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
    this.evidencia = evidencia;
}

Reportes.listarCiclos = (result) => {
    const connection = getConnection.getConnection();

    var sql = 'SELECT @row_number := @row_number + 1 AS id, t1.nombre as ciclo FROM (SELECT * from cicloAcademico where activo=1 order by nombre) as t1, (SELECT @row_number := 0) AS t;';
    connection.query(sql, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Ciclos');
            result(error, null);
            return;
        }
        result(null, results)
        return;
    })
};

Reportes.listarCursos = (result) => {
    const connection = getConnection.getConnection();

    var sql = 'SELECT  @row_number := @row_number + 1 AS id, codigo as curso FROM (SELECT DISTINCT codigo FROM EspacioMedicion) as g, (SELECT @row_number := 0) AS t;';
    connection.query(sql, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Cursos');
            result(error, null);
            return;
        }
        result(null, results)
        return;
    })
};

Reportes.listarCompetencias = (result) => {
    const connection = getConnection.getConnection();

    var sql = 'SELECT  @row_number := @row_number + 1 AS id, codigoCompetencia as competencia FROM (SELECT DISTINCT codigoCompetencia FROM Competencia) as g, (SELECT @row_number := 0) AS t;';
    connection.query(sql, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Competencias');
            result(error, null);
            return;
        }
        result(null, results)
        return;
    })
};

Reportes.listarCursosXEspecialidad = (req, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ComboBoxListarCursos(?)';
    var value = [
        req.body.fidEspecialidad
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de cursos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })
};

Reportes.listarCompetenciasXEspecialidad = (req, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ComboBoxListarCompetencias(?)';
    var value = [
        req.body.fidEspecialidad
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Competencias');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })
};


module.exports = Reportes;