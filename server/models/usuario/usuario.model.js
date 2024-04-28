const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Usuario = function (idUsuario, codigoPUCP, apellidoPaterno, apellidoMaterno, nombres, correo, correo2, celular, contrasenia, usuarioCreacion, rutaFoto) {
    this.idUsuario = idUsuario;
    this.codigoPUCP = codigoPUCP;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.nombres = nombres;
    this.correo = correo;
    this.correo2 = correo2;
    this.contrasenia = contrasenia;
    this.celular = celular;
    this.activo = 1;
    this.usuarioCreacion = usuarioCreacion;
    this.rutaFoto = rutaFoto;
    this.perfiles = [];
}


Usuario.listarUsuario = (usuario, result) => {
    if (/%/.test(usuario.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    var sql = "CALL ListarUsuario(?)";
    var value = [
        usuario.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar usuarios');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}


module.exports = Usuario;