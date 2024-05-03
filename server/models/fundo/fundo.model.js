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