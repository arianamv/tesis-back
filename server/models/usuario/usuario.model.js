const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Usuario = function (idUsuario, nombres, apellidoPat, apellidoMat, dni, email, telefono, contrasenia, Perfil_idPerfil, estado, fundos) {
    this.idUsuario = idUsuario;
    this.nombres = nombres;
    this.apellidoPat = apellidoPat;
    this.apellidoMat = apellidoMat;
    this.dni = dni;
    this.email = email;
    this.telefono = telefono;
    this.contrasenia = contrasenia;
    this.Perfil_idPerfil = Perfil_idPerfil;
    this.estado = 1;
    this.fundos = fundos;
}

Usuario.insertarUsuario = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL insertarUsuario(?,?,?,?,?,?,?,?,?,?)';
    var value = [
        usuario.nombres,
        usuario.apellidoPat,
        usuario.apellidoMat,
        usuario.dni,
        usuario.email,
        usuario.telefono,
        usuario.contrasenia,
        usuario.Perfil_idPerfil,
        usuario.estado,
        JSON.stringify(usuario.fundos)
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            console.error("Error executing query: ", error);  // Log the error
            result(error, null);
            return;
        }
        
        if (results && results[0] && results[0][0]) {
            result(null, results[0][0].idCampaña);
        } else {
            console.error("Unexpected query result: ", results);  // Log unexpected result
            result(new Error("Unexpected query result"), null);
        }
    });
}

Usuario.modificarUsuario = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarUsuario(?,?,?,?,?,?,?,?,?,?,?)';
    var value = [
        usuario.idUsuario,
        usuario.nombres,
        usuario.apellidoPat,
        usuario.apellidoMat,
        usuario.dni,
        usuario.email,
        usuario.telefono,
        usuario.contrasenia,
        usuario.Perfil_idPerfil,
        usuario.estado,
        JSON.stringify(usuario.fundos)
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            console.error("Error in query: ", error);
            result(error, null);
            return;
        }
        result(null, results);
    });
}

Usuario.eliminarUsuario = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL eliminarUsuario(?)';
    var value = [
        usuario.idUsuario
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            console.error("Error in query: ", error);
            result(error, null);
            return;
        }
        result(null, results);
    });
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

Usuario.verificarUsuario = (correo, contrasenia, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL verificarUsuario(?,?)";
    var value = [
        correo,
        contrasenia
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });

};

Usuario.buscarUsuarioXCorreo = (correo, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL buscarUsuarioXCorreo(?)";
    var value = [
        correo
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo enviar la informacion del usuario');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    })

}

Usuario.listarPerfiles = (idUsuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarPerfilRutas(?)";
    var value = [
        idUsuario
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo enviar listar los perfiles del usuario ');
            result(error, null);
            return;

        }
        result(null, results[0])
        return;
    })

}

module.exports = Usuario;