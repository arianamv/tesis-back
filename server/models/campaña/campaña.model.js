const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Campaña = function (idCampaña, nombre, descripcion, fechaIni, fechaFin, estado) {
    this.idCampaña = idCampaña;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaIni = fechaIni;
    this.fechaFin = fechaFin;
    this.estado = estado;
}


Campaña.listarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarCampaña";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Campaña.listarCampañaXCultivo = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarCampañaXCultivo";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Campaña;