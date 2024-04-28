const getConnection = require('../../config/database');
const logger = require('../../config/winston');
const enviarCorreo = require('../cuenta/correo.model');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Perfil = function (idPerfil, fidUsuario, fidResponsabilidad, esAsistente, esAdministrador, nivelAcceso, nombrePerfil, activo, usuarioModificacion, usuarioCreacion, usuarioAnulacion) {
    this.idPerfil = idPerfil;
    this.fidUsuario = fidUsuario;
    this.fidResponsabilidad = fidResponsabilidad;
    this.esAsistente = esAsistente;
    this.nivelAcceso = nivelAcceso;
    this.esAdministrador = esAdministrador;
    this.nombrePerfil = nombrePerfil;
    this.usuarioModificacion = usuarioModificacion;
    this.usuarioCreacion = usuarioCreacion;
    this.usuarioAnulacion = usuarioAnulacion;
    this.activo = activo;
}

Perfil.insertarPerfil = (perfil, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarPerfil(@result,?,?,?,?,?,@correo,@texto, @primerPerfil)";
    var value = [
        perfil.fidUsuario,
        perfil.fidResponsabilidad,
        perfil.esAsistente,
        perfil.nivelAcceso,
        perfil.usuarioCreacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de perfil');
            result(error, null);
            return;
        }
        connection.query('SELECT @result, @correo, @texto, @primerPerfil', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar el perfil');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])

            var texto = "Usted ha sido asignado como " + results[0]['@texto'] + ". \n \n Enlace a AcrediPUCP: https://acredita.inf.pucp.edu.pe/";
            if(results[0]['@primerPerfil'] == 1){
                texto = texto + '\n \n Si es su primera vez en el sistema registre su contraseña usando la opcion de ¿Olvido su contraseña?';
            }
            //console.log(results[0]['@correo'] + "\n" +texto)
            enviarCorreo.enviarCorreo(results[0]['@correo'],"Asignación de Rol en AcrediPUCP", texto);

            result(null, results[0]['@result'])
            return;
        });
    });
};

Perfil.deshabilitarPerfiles = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL deshabilitarPerfiles(?,?)";
    const idList = (req.body.idPerfiles).join(',');
    var value = [
        idList,
        req.body.usuarioAnulacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo eliminar el perfil');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
};

Perfil.reemplazarPerfil = (req, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL reemplazarPerfil(?,?,?)";
    var value = [
        req.body.responsableNuevo,
        req.body.perfilResponsableAntiguo,
        req.body.usuarioModificacion
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo reemplazar el perfil');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
};

module.exports = Perfil;