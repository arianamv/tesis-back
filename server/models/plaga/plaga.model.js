const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Plaga = function (idPlaga, nombrePlaga, descripcion, nombreCientifico, familia, cantGrave, cantMedio, cantLeve, estado) {
    this.idPlaga = idPlaga;
    this.nombrePlaga = nombrePlaga;
    this.descripcion = descripcion;
    this.nombreCientifico = nombreCientifico;
    this.familia = familia;
    this.cantGrave = cantGrave;
    this.cantMedio = cantMedio;
    this.cantLeve = cantLeve;
    this.estado = 1;
}

Plaga.insertarPlaga = (plaga, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL insertarPlaga(?,?,?,?,?,?,?,?)';
    var value = [
        plaga.nombrePlaga,
        plaga.descripcion,
        plaga.nombreCientifico,
        plaga.familia,
        plaga.cantGrave,
        plaga.cantMedio,
        plaga.cantLeve,
        plaga.estado,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la inserción de plaga');
            result(error, null);
            return;
        }

    })
}

Plaga.modificarPlaga = (plaga, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarPlaga(?,?,?,?,?,?,?,?,?)';
    var value = [
        plaga.idPlaga,
        plaga.nombrePlaga,
        plaga.descripcion,
        plaga.nombreCientifico,
        plaga.familia,
        plaga.cantGrave,
        plaga.cantMedio,
        plaga.cantLeve,
        plaga.estado,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la modificación de plaga');
            result(error, null);
            return;
        }

    })
}

Plaga.eliminarPlaga = (plaga, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL eliminarPlaga(?)';
    var value = [
        plaga.idPlaga,
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo realizar la eliminación de plaga');
            result(error, null);
            return;
        }

    })
}

Plaga.listarPlaga = (plaga, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarPlagas";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Plaga;