const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Plaga = function (idPlaga, nombrePlaga, descripcion, cantGrave, cantMedio, cantLeve, estado) {
    this.idPlaga = idPlaga;
    this.nombrePlaga = nombrePlaga;
    this.descripcion = descripcion;
    this.cantGrave = cantGrave;
    this.cantMedio = cantMedio;
    this.cantLeve = cantLeve;
    this.estado = estado;
}


Plaga.listarPlaga = (plaga, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarPlagas";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Plaga;