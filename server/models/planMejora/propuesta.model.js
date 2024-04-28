const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Propuesta = function (idPropuesta, idPlanMejora, codigo, descripcion, activo, usuarioCreacion, usuarioModificacion, usuarioAnulacion) {
    this.idPropuesta = idPropuesta;
    this.idPlanMejora = idPlanMejora;
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.activo = activo;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

Propuesta.listarPropuesta = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarPropuestaXIdPlanMejora(?)";
    var value = [datos.body.idPlanMejora];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Propuestas para ese Plan de Mejora');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}
Propuesta.insertarPropuesta = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL InsertarPropuesta(?,?,?,?)';
    var value = [
        datos.idPlanMejora,
        datos.codigo,
        datos.descripcion,
        datos.usuarioCreacion,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Propuesta');
            result(error, null);
            return;
        }
        console.log("El id creado es " + results[0][0]["ID"])
        result(null, results[0][0]["ID"])
        return;

    })
}
Propuesta.modificarPropuesta =(propuesta, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ModificarPropuesta(?,?,?,?)';
    var value = [
        propuesta.idPropuesta,
        propuesta.codigo,
        propuesta.descripcion,
        propuesta.usuarioModificacion
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
Propuesta.eliminarPropuesta = (datos, idAnulacion, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL EliminarPropuesta(?,?)';
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
module.exports = Propuesta;