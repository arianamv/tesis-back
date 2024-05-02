const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Lote = function (idLote, nombreLote, descripcion, idFundo, estado) {
    this.idLote = idLote;
    this.nombreLote = nombreLote;
    this.descripcion = descripcion;
    this.idFundo = idFundo;
    this.estado = estado;
}


Lote.listarLote = (lote, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarLotes";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Lote;