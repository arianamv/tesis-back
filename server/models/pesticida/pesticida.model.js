const getConnection = require('../../config/database');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});

const Pesticida = function (idPesticida, nombrePeticida, descripcion, material, recomendaciones, metodoAplicacion, toxicidad, estado, plagas) {
    this.idPesticida = idPesticida;
    this.nombrePeticida = nombrePeticida;
    this.descripcion = descripcion;
    this.material = material;
    this.recomendaciones = recomendaciones;
    this.metodoAplicacion = metodoAplicacion;
    this.toxicidad = toxicidad;
    this.estado = estado;
    this.plagas = plagas;
}

Pesticida.insertarPesticida = (pesticida, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL insertarPesticida(?,?,?,?,?,?,?,?)';
    var value = [
        pesticida.nombrePeticida,
        pesticida.descripcion,
        pesticida.material,
        pesticida.recomendaciones,
        pesticida.metodoAplicacion,
        pesticida.toxicidad,
        pesticida.estado,
        JSON.stringify(pesticida.plagas)
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

Pesticida.modificarPesticida = (pesticida, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL modificarPesticida(?,?,?,?,?,?,?,?,?)';
    var value = [
        pesticida.idPesticida,
        pesticida.nombrePeticida,
        pesticida.descripcion,
        pesticida.material,
        pesticida.recomendaciones,
        pesticida.metodoAplicacion,
        pesticida.toxicidad,
        pesticida.estado,
        JSON.stringify(pesticida.plagas)
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

Pesticida.eliminarPesticida = (pesticida, result) => {
    const connection = getConnection.getConnection();
    var sql = 'CALL eliminarPesticida(?)';
    var value = [
        pesticida.idPesticida
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

Pesticida.listarPesticida = (pesticida, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarPesticidas";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        result(null, results[0])
        return;
    });
}

Pesticida.listarPesticidaXPlaga = (pesticida, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL listarPesticidaXPlaga";
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

Pesticida.listarMejoresPesticidas = (pesticida, result) => {
    const connection = getConnection.getConnection();
    console.log(pesticida.body)
    var sql = "CALL listarMejoresPesticidas(?,?,?,?)";
    var value = [
        pesticida.body.idPlaga,
        pesticida.body.idCultivo,
        pesticida.body.fechaEvaluacion,
        pesticida.body.fechaCosecha,
    ];
    connection.query(sql, value, (error, results) => {
        if (error) throw error;
        result(null, results[0])
    });
}


module.exports = Pesticida;