const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Fundo = function (idFundo, nombreFundo, descripcion, totalHectareas, longitud, latitud, estado) {
    this.idFundo = idFundo;
    this.nombreFundo = nombreFundo;
    this.descripcion = descripcion;
    this.totalHectareas = totalHectareas;
    this.longitud = longitud;
    this.latitud = latitud;
    this.estado = estado;
}

Fundo.insertarFundo = (fundo, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL insertarFundo(?,?,?,?,?,?)';
    var value = [
        fundo.nombreFundo,
        fundo.descripcion,
        fundo.totalHectareas,
        fundo.longitud,
        fundo.latitud,
        fundo.estado
    ];

    connection.query(sql, value, (error, results) => {
        if (error) {
            console.error("Error executing query: ", error);  // Log the error
            result(error, null);
            return;
        }
        
        if (results && results[0] && results[0][0]) {
            result(null, results[0][0].idEvaluacion);
        } else {
            console.error("Unexpected query result: ", results);  // Log unexpected result
            result(new Error("Unexpected query result"), null);
        }
    });
};

Fundo.modificarFundo = (fundo, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL modificarFundo(?,?,?,?,?,?,?)';
    var value = [
        fundo.idFundo,
        fundo.nombreFundo,
        fundo.descripcion,
        fundo.totalHectareas,
        fundo.longitud,
        fundo.latitud,
        fundo.estado
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            console.error("Error in query: ", error);
            result(error, null);
            return;
        }
        result(null, results);
    });
};

Fundo.eliminarFundo = (fundo, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL eliminarFundo(?)';
    var value = [
        fundo.idFundo,
    ];

    connection.query(sql, value, function (error, results) {
        if (error) {
            console.error("Error in query: ", error);
            result(error, null);
            return;
        }
        result(null, results);
    });
};

Fundo.getFundo = (fundo, result) => {
    if (/%/.test(fundo.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(fundo.body)
    var sql = "CALL fundoGet(?)";
    var value = [
        fundo.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Fundo.listarFundo = (fundo, result) => {
    const connection = getConnection.getConnection();
    console.log(fundo.body)
    var sql = "CALL listarFundos";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Fundo;