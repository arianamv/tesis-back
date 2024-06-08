const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Pesticida = function (idPesticida, nombrePesticida, descripcion, material, dosisRec, unidadRec, periodoCarencia, periodoReingreso, recomendaciones, metodoAplicacion, estado) {
    this.idPesticida = idPesticida;
    this.nombrePesticida = nombrePesticida;
    this.descripcion = descripcion;
    this.material = material;
    this.dosisRec = dosisRec;
    this.unidadRec = unidadRec;
    this.periodoCarencia = periodoCarencia;
    this.periodoReingreso = periodoReingreso;
    this.recomendaciones = recomendaciones;
    this.metodoAplicacion = metodoAplicacion;
    this.estado = estado;
}


Pesticida.listarPesticida = (pesticida, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarPesticidas";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Pesticida.listarMetodosAplicacion = (pesticida, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarMetodosAplicacion";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}


module.exports = Pesticida;