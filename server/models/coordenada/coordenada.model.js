const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Coordenada = function (idCoordenada, latitud, longitud, idLote, idFundo, estado) {
    this.idCoordenada = idCoordenada;
    this.latitud = latitud;
    this.longitud = longitud;
    this.estado = estado;
    this.idLote = idLote;
    this.idFundo = idFundo;
}


Coordenada.listarCoordenadaXLote = (coordenada, result) => {
    if (/%/.test(coordenada.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(coordenada.body)
    var sql = "CALL listarCoordenadaXLote(?)";
    var value = [
        coordenada.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Coordenada;