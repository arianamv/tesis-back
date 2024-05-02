const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Cultivo = function (idCultivo, nombreCultivo, descripcion, estado) {
    this.idCultivo = idCultivo;
    this.nombreCultivo = nombreCultivo;
    this.descripcion = descripcion;
    this.estado = estado;
}


Cultivo.listarCultivo = (cultivo, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarCultivos";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Cultivo;