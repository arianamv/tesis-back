const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const ObjetivoEducacional = function (idObjetivoEducacional, fidEspecialidad, sumilla, descripcion, codigoObjetivo, activo, usuarioCreacion, usuarioModificacion, usuarioAnulacion) {
    this.idObjetivoEducacional = idObjetivoEducacional;
    this.fidEspecialidad = fidEspecialidad;
    this.sumilla = sumilla;
    this.descripcion = descripcion;
    this.codigoObjetivo = codigoObjetivo;
    this.activo = activo;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

ObjetivoEducacional.insertarObjetivoEducacional = (objetivoEducacional, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL InsertarObjetivoEducacional(@result,?,?,?,?,?)';
    var value = [
        objetivoEducacional.fidEspecialidad,
        objetivoEducacional.sumilla,
        objetivoEducacional.descripcion,
        objetivoEducacional.codigoObjetivo,
        objetivoEducacional.usuarioCreacion,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Objetivo educacional');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar el objetivo educacional.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });

    })

}

ObjetivoEducacional.anularObjetivoEducacional = (idobjetivoEducacional, idUsuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL AnularObjetivoEducacional(?,?)";
    var value = [idobjetivoEducacional, idUsuario];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo anular el objetivo educacional');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}


ObjetivoEducacional.modificarObjetivoEducacional = (objetivoEducacional, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ModificarObjetivoEducacional(?,?,?,?,?)";
    var value = [
        objetivoEducacional.idObjetivoEducacional,
        objetivoEducacional.sumilla,
        objetivoEducacional.descripcion,
        objetivoEducacional.codigoObjetivo,
        objetivoEducacional.usuarioModificacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo modificar el objetivo educacional');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

ObjetivoEducacional.listarHistoricoObjetivoEducacional = (data, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarHistoricoObjetivoEducacional(?,?)";
    var value = [
        data.body.fidEspecialidad,
        data.body.codigoDescripcion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los objetivos educacionales');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}


ObjetivoEducacional.listarActivosObjetivoEducacional = (data, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarActivoObjetivoEducacional(?,?)";
    var value = [
        data.body.fidEspecialidad,
        data.body.codigoDescripcion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo listar los objetivos educacionales activos');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

ObjetivoEducacional.reporteObjetivos = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call ReporteObjetivoEducacional(?,?,?,?);';
    var value = [
        datos.body.fidEspecialidad,
        datos.body.estado,
        datos.body.fechaD,
        datos.body.fechaH
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de objetivos educacionales');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

};

module.exports = ObjetivoEducacional;