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


Fundo.listarFundo = (fundo, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarFundos";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Fundo;