const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Aplicacion = function (idADP, fecha, semana, cantidadAplicada, unidadAplicada, idCampañaXLote, idPesticida, estado) {
    this.idADP = idADP;
    this.fecha = fecha;
    this.semana = semana;
    this.cantidadAplicada = cantidadAplicada;
    this.unidadAplicada = unidadAplicada;
    this.idCampañaXLote = idCampañaXLote;
    this.idPesticida = idPesticida;
    this.estado = 1;
}


Aplicacion.listarAplicaciones = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarAplicaciones";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

module.exports = Aplicacion;