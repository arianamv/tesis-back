const getConnection = require('../../config/database');
const { listarCoordenadaXLote } = require('../coordenada/coordenada.model');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Lote = function (idLote, nombreLote, descripcion, tamanio, Fundo_idFundo, estado, campaña, coordenadas) {
    this.idLote = idLote;
    this.nombreLote = nombreLote;
    this.descripcion = descripcion;
    this.tamanio = tamanio;
    this.Fundo_idFundo = Fundo_idFundo;
    this.estado = estado;
    this.campaña = campaña;
    this.coordenadas = coordenadas;
}

Lote.insertarLote = (lote, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL insertarLote(?,?,?,?,?,?,?)';
    var value = [
        lote.nombreLote,
        lote.descripcion,
        lote.tamanio,
        lote.Fundo_idFundo,
        lote.estado,
        JSON.stringify(lote.campaña),
        JSON.stringify(lote.coordenadas)
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            console.error("Error executing query: ", error);  // Log the error
            result(error, null);
            return;
        }
        
        if (results && results[0] && results[0][0]) {
            result(null, results[0][0].idCampaña);
        } else {
            console.error("Unexpected query result: ", results);  // Log unexpected result
            result(new Error("Unexpected query result"), null);
        }
    });
}

Lote.modificarLote = (lote, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarLote(?,?,?,?,?,?,?,?)';
    var value = [
        lote.idLote,
        lote.nombreLote,
        lote.descripcion,
        lote.tamanio,
        lote.Fundo_idFundo,
        lote.estado,
        JSON.stringify(lote.campaña),
        JSON.stringify(lote.coordenadas)
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            console.error("Error in query: ", error);
            result(error, null);
            return;
        }
        result(null, results);
    });
}

Lote.eliminarLote = (lote, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL eliminarLote(?,?,?,?,?,?,?,?)';
    var value = [
        lote.idLote,
        lote.nombreLote,
        lote.descripcion,
        lote.tamanio,
        lote.Fundo_idFundo,
        lote.estado,
        JSON.stringify(lote.campaña),
        JSON.stringify(lote.coordenadas)
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            console.error("Error in query: ", error);
            result(error, null);
            return;
        }
        result(null, results);
    });
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

Lote.listarLotesXCampaña = (lote, result) => {
    if (/%/.test(lote.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(lote.body)
    var sql = "CALL listarLotesXCampaña(?)";
    var value = [
        lote.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

Lote.listarLotesXCampañaXFundo = (lote, result) => {
    if (/%/.test(lote.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(lote.body)
    var sql = "CALL listarLotesXCampañaXFundo(?,?)";
    var value = [
        lote.body.idFundo,
        lote.body.idCampania
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