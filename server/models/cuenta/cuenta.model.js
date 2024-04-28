const getConnection = require('../../config/database');
const logger = require('../../config/winston');
const envioCorreo = require('./correo.model');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const Cuenta = function (usuario) {
    this.idUsuario = idUsuario;
    this.correo = correo;
    this.contrasenia = contrasenia;
}
Cuenta.recuperarContrasenia = (datos, result) => {
    const connection = getConnection.getConnection();
    // verifica que el correo exista, devuelve un id usuario y un codigo para cambiar la contrasenia
    var sql = 'CALL RecuparContrasenia(@result,@codigo,?)';
    var value = [
        datos.body.correo,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se encontrar el correo');
            result(error, null);
            return;
        }
        connection.query('SELECT @result, @codigo', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo encontrar el correo o generar el codigo.');
                result(error, null);
                return;
            }
            if (results[0]['@result'] < 1) {
                logger.log('error', 'No se pudo encontrar el correo o generar el codigo.');
                result(error, null);
                return;
            }
            //console.log("llegue");
            var texto = "Su código de verificación es " + results[0]['@codigo'];
            envioCorreo.enviarCorreo(datos.body.correo, "Cambio de contraseña AcrediPUCP", texto);
            console.log("El id del usuario es " + results[0]['@result'] + " y el codigo generado es " + results[0]['@codigo'])
            //result(null,results[0])
            var resultadoData = results[0]['@result'];
            var codigoData = results[0]['@codigo'];
            var data = { result: resultadoData, codigo: codigoData }
            result(null, data);


            return;
        });

    })

};

Cuenta.cambiarContrasenia = (datos, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL SolicitudModificarContrasenia(?,?,?,@result)';
    var value = [
        datos.body.idUsuario,
        datos.body.contrasenia,
        datos.body.codigo
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar el cambio de contrasenia');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo cambiar la contrasenia.');
                result(error, null);
                return;
            }

            if (results[0]['@result'] < 1) {
                result(null, null)
                return;
            }

            console.log("El resultado del cambio fue " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });

    })

};


module.exports = Cuenta;