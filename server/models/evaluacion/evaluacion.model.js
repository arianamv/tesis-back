const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Evaluacion = function (idEvaluacion, descripcion, fecha, idCampañaXLote, semana, cantEncontrada, idPlaga, gravedad, idUsuario, idPerfil, estado) {
    this.idEvaluacion = idEvaluacion || null;;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.idCampañaXLote = idCampañaXLote;
    this.semana = semana;
    this.cantEncontrada = cantEncontrada;
    this.idPlaga = idPlaga;
    this.gravedad = gravedad;
    this.idUsuario = idUsuario;
    this.idPerfil = idPerfil;
    this.estado = 1;
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

Evaluacion.listarEvaluacionesXCampaña = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    var sql = "CALL listarEvaluacionesXCampaña(?)";
    var value = [
        evaluacion.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

Evaluacion.listarEvaluacionesXCampañaXUsuario = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    var sql = "CALL listarEvaluacionesXCampañaXUsuario(?,?)";
    var value = [
        evaluacion.body.idCampaña,
        evaluacion.body.idUsuario
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}

Evaluacion.listarLastEvaluacionesXSemana = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(evaluacion.body)
    var sql = "CALL listarLastEvaluacionesXSemana(?,?,?)";
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

Evaluacion.listarEvaluacionesXCampañaXFundo = (evaluacion, result) => {
    if (/%/.test(evaluacion.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    console.log(evaluacion.body)
    var sql = "CALL listarEvaluacionesXCampañaXFundo(?,?,?)";
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

Evaluacion.insertarEvaluacion = (evaluacion, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL insertarEvaluacion(?,?,?,?,?,?,?,?,?,?)';
    var values = [
        evaluacion.descripcion,
        evaluacion.fecha,
        evaluacion.idCampañaXLote,
        evaluacion.semana,
        evaluacion.cantEncontrada,
        evaluacion.idPlaga,
        evaluacion.gravedad,
        evaluacion.idUsuario,
        evaluacion.idPerfil,
        evaluacion.estado
    ];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error executing query: ", error);  // Log the error
            result(error, null);
            return;
        }
        
        if (results && results[0] && results[0][0]) {
            result(null, results[0][0].idEvaluacion);
        } else {
            console.error("Unexpected query result: ", results);  // Log unexpected result
            result(new Error("Unexpected query result"), null);
        }
    });
};

Evaluacion.modificarEvaluacion = (evaluacion, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL modificarEvaluacion(?,?,?,?,?,?,?,?,?,?,?)';
    var value = [
        evaluacion.idEvaluacion,
        evaluacion.descripcion,
        evaluacion.fecha,
        evaluacion.idCampañaXLote,
        evaluacion.semana,
        evaluacion.cantEncontrada,
        evaluacion.idPlaga,
        evaluacion.gravedad,
        evaluacion.idUsuario,
        evaluacion.idPerfil,
        evaluacion.estado
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



Evaluacion.eliminarEvaluacion = (evaluacion, result) => {
    const connection = getConnection.getConnection();

    var sql = 'CALL eliminarEvaluacion(?)';
    var value = [
        evaluacion.idEvaluacion,
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

module.exports = Evaluacion;