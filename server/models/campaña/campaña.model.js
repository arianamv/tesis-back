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

Campaña.insertarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL insertarCampaña(?,?,?,?,?)';
    var value = [
        campaña.nombre,
        campaña.descripcion,
        campaña.fechaIni,
        campaña.fechaFin,
        campaña.estado,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de campaña');
            result(error, null);
            return;
        }
    })
}

Campaña.insertarCampañaXCultivo = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL insertarCampañaXCultivo(?,?,?,?,?)';
    var value = [
        campaña.idCampaña,
        campaña.idCultivo,
        campaña.idVariedad,
        campaña.fechCosecha,
        campaña.estado,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de campaña');
            result(error, null);
            return;
        }
    })
}

Campaña.modificarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarCampaña(?,?,?,?,?,?)';
    var value = [
        campaña.idCampaña,
        campaña.nombre,
        campaña.descripcion,
        campaña.fechaIni,
        campaña.fechaFin,
        campaña.estado,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de campaña');
            result(error, null);
            return;
        }
    })
}

Campaña.modificarCampañaXCultivo = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarCampañaXCultivo(?,?,?,?,?,?)';
    var value = [
        campaña.idCampañaXCultivo,
        campaña.idCampaña,
        campaña.idCultivo,
        campaña.idVariedad,
        campaña.fechCosecha,
        campaña.estado,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de campaña');
            result(error, null);
            return;
        }
    })
}

Campaña.eliminarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL eliminarCampaña(?,?,?,?,?,?)';
    var value = [
        campaña.idCampaña,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de campaña');
            result(error, null);
            return;
        }
    })
}

Campaña.eliminarCampañaXCultivo = (campaña, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL eliminarCampañaXCultivo(?)';
    var value = [
        campaña.idCampañaXCultivo,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de campaña');
            result(error, null);
            return;
        }
    })
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