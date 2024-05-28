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

Cultivo.listarVariedadesXCultivo = (cultivo, result) => {
    if (/%/.test(cultivo.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(cultivo.body)
    var sql = "CALL listarVariedadesXCultivo(?)";
    var value = [
        cultivo.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}


module.exports = Cultivo;