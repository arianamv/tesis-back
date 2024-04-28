const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const PlanMejora = function (idPlanMejora, fidEspecialidad, fidEstado, codigo, descripcion, activo, usuarioCreacion, usuarioModificacion, usuarioAnulacion) {
    this.idPlanMejora = idPlanMejora;
    this.fidEspecialidad = fidEspecialidad;
    this.fidEstado = fidEstado;
    this.descripcion = descripcion;
    this.activo = activo;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioAnulacion = usuarioAnulacion;
    this.codigo = codigo;
}

PlanMejora.insertarPlanMejora = (planmejora, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL InsertarPlanMejora(@result,?,?,?,?,?)';
    var value = [
        planmejora.fidEspecialidad,
        planmejora.fidEstado,
        planmejora.codigo,
        planmejora.descripcion,
        planmejora.usuarioCreacion,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Plan de mejora');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar el plan de mejora.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });

    })

};

PlanMejora.listarHistoricoPlanMejora = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarPlanMejoraXEspecialidad(?,?)";
    var value = [datos.body.codigoPlanMejora, datos.body.idEspecialidad];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Historico de Planes de mejora de la especialidad');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

PlanMejora.listarActivosPlanMejora = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarPlanMejoraActivos(?)";
    var value = [datos.body.idEspecialidad];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de Planes de mejora activos de la especialidad');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}
PlanMejora.modificarPlanMejora =(competencia, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ModificarPlanMejora(?,?,?,?)';
    var value = [
        competencia.idPlanMejora,
        competencia.codigo,
        competencia.descripcion,
        competencia.usuarioModificacion
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

PlanMejora.modificarPlanMejora = (competencia, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ModificarPlanMejora(?,?,?,?)';
    var value = [
        competencia.idPlanMejora,
        competencia.codigo,
        competencia.descripcion,
        competencia.usuarioModificacion
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


PlanMejora.anularPlanMejora = (idPlanMejora, idAnulacion, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL AnularPlanMejora(?,?)";
    var value = [idPlanMejora, idAnulacion];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo anular el plan de mejora');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;
    })
}

PlanMejora.reportePlanesMejora = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'call acredipucp.ReportePlanDeMejora(?,?,?,?);';
    var value = [
        datos.body.fidEspecialidad,
        datos.body.estado,
        datos.body.fechaD,
        datos.body.fechaH
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el reporte de Planes de Mejora');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    })

};

module.exports = PlanMejora;