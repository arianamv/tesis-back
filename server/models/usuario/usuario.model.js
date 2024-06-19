const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Usuario = function (idUsuario, apellidoPat, apellidoMat, nombres, email, telefono, contrasenia, estado) {
    this.idUsuario = idUsuario;
    this.apellidoPat = apellidoPat;
    this.apellidoMat = apellidoMat;
    this.nombres = nombres;
    this.email = email;
    this.contrasenia = contrasenia;
    this.telefono = telefono;
    this.estado = 1;
}


Usuario.listarUsuario = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarUsuarios";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

//listarEvaluadores

Usuario.listarEvaluadores = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarEvaluadores";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Usuario.listarUsuarioXFundo = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarUsuarioXFundo";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

module.exports = Usuario;