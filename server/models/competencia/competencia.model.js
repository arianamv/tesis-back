const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const Competencia = function (fidEspecialidad, idCompetencia, codigo, descripcion, evidencia, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.fidEspecialidad = fidEspecialidad;
    this.idCompetencia = idCompetencia;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
    this.evidencia = evidencia;
}
Competencia.insertarCompetencia = (competencia, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL InsertarCompetencia(@result,?,?,?,?,?)';
    var value = [
        competencia.fidEspecialidad,
        competencia.descripcion,
        competencia.codigo,
        competencia.usuarioCreacion,
        competencia.evidencia,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Competencia');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar la Competencia.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });

    })

};
Competencia.listarCompetencia = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ListarCompetencia(?,?)';
    var value = [
        datos.body.codigoCompetencia,
        datos.body.fidEspecialidad
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
Competencia.modificarCompetencia = (competencia, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ModificarCompetencia(?,?,?,?,?)';
    var value = [
        competencia.idCompetencia,
        competencia.codigo,
        competencia.descripcion,
        competencia.usuarioModificacion,
        competencia.evidencia,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo modificar a la competencia');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

};

Competencia.deshabilitarCompetencia = (competencia, idAnulacion, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL DeshabilitarCompetencia(?,?)";
    var value = [
        competencia,
        idAnulacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo deshabilitar Competencia');
            result(error, null);
            return;
        }
        result(null, true)
        return;
    });
}

Competencia.reporteIndicadores = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ReporteIndicadores(?,?,?,?,?);';
    var value = [
        datos.body.estado,
        datos.body.fechaD,
        datos.body.fechaH,
        datos.body.competencia,
        datos.body.idEspecialidad
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
Competencia.insertarEvidencia1 = (idCompetencia, idMuestra,idIndicador, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL RegistrarEvidencia(?,?,?)';
    var value = [
        idCompetencia,
        idMuestra,
        idIndicador
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción la evidencia 1');
            result(error, null);
            return;
        }
        console.log("El id creado es " + results[0][0]["ID"])
        result(null, results[0][0]["ID"])
        return;
    })
};

Competencia.insertarEvidencia2 = (idCompMuestra, _nombreArchivo, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL RegistrarEvidencia2(?,?)';
    var value = [
        idCompMuestra,
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

module.exports = Competencia;