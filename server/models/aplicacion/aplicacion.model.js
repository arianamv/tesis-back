const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Aplicacion = function (idADP, fecha,area, cantidadAplicada, unidadAplicada, semana, idCampañaXLote, idPesticida, estado) {
    this.idADP = idADP;
    this.fecha = fecha;
    this.area = area;
    this.cantidadAplicada = cantidadAplicada;
    this.unidadAplicada = unidadAplicada;
    this.semana = semana;
    this.idCampañaXLote = idCampañaXLote;
    this.idPesticida = idPesticida;
    this.estado = 1;
}

Aplicacion.insertarAplicacion = (aplicacion, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL insertarAplicacion(?,?,?,?,?,?,?,?)';
    var values = [
        aplicacion.fecha,
        aplicacion.area,
        aplicacion.cantidadAplicada,
        aplicacion.unidadAplicada,
        aplicacion.semana,
        aplicacion.idCampañaXLote,
        aplicacion.idPesticida,
        aplicacion.estado
    ];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error executing query: ", error);  // Log the error
            result(error, null);
            return;
        }
        
        if (results && results[0] && results[0][0]) {
            result(null, results[0][0].idADP);
        } else {
            console.error("Unexpected query result: ", results);  // Log unexpected result
            result(new Error("Unexpected query result"), null);
        }
    });
};

Aplicacion.modificarAplicacion = (aplicacion, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL modificarAplicacion(?,?,?,?,?,?,?,?,?)';
    var value = [
        aplicacion.idADP,
        aplicacion.fecha,
        aplicacion.area,
        aplicacion.cantidadAplicada,
        aplicacion.unidadAplicada,
        aplicacion.semana,
        aplicacion.idCampañaXLote,
        aplicacion.idPesticida,
        aplicacion.estado
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

Aplicacion.eliminarAplicacion = (aplicacion, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL eliminarAplicacion(?)';
    var value = [
        aplicacion.idADP,
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


Aplicacion.listarAplicaciones = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarAplicaciones";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Aplicacion.listarAplicacionesXCampaña = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(evaluacion.body)
    var sql = "CALL listarAplicacionesXCampaña(?)";
    var value = [
        evaluacion.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

Aplicacion.listarAplicacionesXCampañaXFundo = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(evaluacion.body)
    var sql = "CALL listarAplicacionesXCampañaXFundo(?,?,?)";
    var value = [
        evaluacion.body.idFundo,
        evaluacion.body.idCampaña,
        evaluacion.body.semana
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

module.exports = Aplicacion;