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

Campaña.insertarCampaña = (campaña, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL insertarCampaña(@result,?,?,?,?)';
    var value = [
        campaña.idCampaña,
        campaña.nombre,
        campaña.fechaIni,
        campaña.fechaFin,
        campaña.estado,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de la campaña');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo insertar la campaña.');
                result(error, null);
                return;
            }

            console.log("El id creado es " + results[0]['@result'])
            result(null, results[0]['@result'])
            return;
        });
    })
}


module.exports = Campaña;