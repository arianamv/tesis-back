const getConnection = require('../../config/database');
const { listarCoordenadaXLote } = require('../coordenada/coordenada.model');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Lote = function (idLote, nombreLote, descripcion, idFundo, estado, latitud, longitud) {
    this.idLote = idLote;
    this.nombreLote = nombreLote;
    this.descripcion = descripcion;
    this.idFundo = idFundo;
    this.estado = estado;
    this.coordenadas = {
        latitud: latitud,
        lontgitud: longitud,
    }
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

Lote.listarLoteXFundo = (lote, result) => {
    if (/%/.test(lote.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(lote.body)
    var sql = "CALL listarLotesXFundo(?)";
    var value = [
        lote.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

Lote.listarLotesCoord = (lote, result) => {
    if (/%/.test(lote.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    var sql = "CALL listarLotesCoord(?)";
    var value = [
        lote.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar lotes');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}


module.exports = Lote;