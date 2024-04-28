const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Rubrica = function (idRubrica, fidIndicador, nivel, descripcion, activo, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.idRubrica = idRubrica;
    this.fidIndicador = fidIndicador;
    this.nivel = nivel;
    this.descripcion = descripcion;
    this.activo = activo;

    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
}

Rubrica.insertarRubrica = (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarRubrica(@result,?,?,?,?)";
    console.log(datos);
    var value = [
        datos.fidIndicador,
        datos.nivel,
        datos.descripcion,
        datos.usuarioCreacion
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de Rubrica');
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

    });
}


Rubrica.modificarRubrica = (rubrica, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL ModificarRubrica(?,?,?)';
    var value = [
        rubrica.idRubrica,
        rubrica.descripcion,
        rubrica.usuarioModificacion,
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

};

Rubrica.listarRubrica = async (datos, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL ListarRubrica(?)';
    var value = [
        datos
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el listado de indicadores por idCompetencia');
            result(error, null);
            return;
        }
        //console.log("El id creado es "+ results[0]['@result'])
        result(null, results[0])
        return;

    });
}

module.exports = Rubrica;
