const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Evaluacion = function (idEvaluacion, descripcion, fecha, semana, cantEncontrada, idPlaga, gravedad, estado) {
    this.idEvaluacion = idEvaluacion;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.semana = semana;
    this.cantEncontrada = cantEncontrada;
    this.idPlaga = idPlaga;
    this.gravedad = gravedad;
    this.estado = estado;
}

Evaluacion.listarEvaluacionesXSemana = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(evaluacion.body)
    var sql = "CALL listarEvaluacionesXSemana(?)";
    var value = [
        evaluacion.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

Evaluacion.listarEvaluaciones = (evaluacion, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarEvaluaciones";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Evaluacion.listarSemanas = (evaluacion, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarSemanas";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Evaluacion.listarGravedades = (evaluacion, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarGravedades";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Evaluacion.listarPlagasActivas = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(evaluacion.body)
    var sql = "CALL listarPlagasActivas(?)";
    var value = [
        evaluacion.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}



module.exports = Evaluacion;