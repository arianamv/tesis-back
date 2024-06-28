const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Campaña = function (idCampaña, nombre, descripcion, fechaIni, fechaFin, estado, cultivos) {
    this.idCampaña = idCampaña;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaIni = fechaIni;
    this.fechaFin = fechaFin;
    this.estado = estado;
    this.cultivos = cultivos;
}

Campaña.insertarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL insertarCampaña(?,?,?,?,?,?)';
    var value = [
        campaña.nombre,
        campaña.descripcion,
        campaña.fechaIni,
        campaña.fechaFin,
        campaña.estado,
        JSON.stringify(campaña.cultivos)
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

Campaña.modificarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarCampaña(?,?,?,?,?,?,?)';
    var value = [
        campaña.idCampaña,
        campaña.nombre,
        campaña.descripcion,
        campaña.fechaIni,
        campaña.fechaFin,
        campaña.estado,
        JSON.stringify(campaña.cultivos)
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

Campaña.eliminarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL eliminarCampaña(?)';
    var value = [
        campaña.idCampaña,
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

Campaña.listarCampañaXFundo = (campaña, result) => {
    if (/%/.test(campaña.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(campaña.body)
    var sql = "CALL listarCampañaXFundo(?)";
    var value = [
        campaña.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

Campaña.getCampañaXLote = (campaña, result) => {
    if (/%/.test(campaña.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(campaña.body)
    var sql = "CALL getCampañaXLote(?,?)";
    var value = [
        campaña.body.idCampaña,
        campaña.body.idLote
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}


module.exports = Campaña;