const getConnection = require('../../config/database');
const logger = require('../../config/winston');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../../.env.production' 
          : __dirname + '/../../.env.development'
});
const envioCorreo = require('../cuenta/correo.model')

const Usuario = function (idUsuario, codigoPUCP, apellidoPaterno, apellidoMaterno, nombres, correo, correo2, celular, contrasenia, usuarioCreacion, rutaFoto) {
    this.idUsuario = idUsuario;
    this.codigoPUCP = codigoPUCP;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.nombres = nombres;
    this.correo = correo;
    this.correo2 = correo2;
    this.contrasenia = contrasenia;
    this.celular = celular;
    this.activo = 1;
    this.usuarioCreacion = usuarioCreacion;
    this.rutaFoto = rutaFoto;
    this.perfiles = [];
}

Usuario.insertarUsuario = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL InsertarUsuario(@result,?,?,?,?,?,?,?,?)";
    var value = [
        usuario.nombres,
        usuario.apellidoPaterno,
        usuario.apellidoMaterno,
        usuario.codigoPUCP,
        usuario.correo,
        usuario.correo2,
        usuario.celular,
        usuario.usuarioCreacion
    ];
    console.log(value);

    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo registrar al usuario');
            result(error, null);
            return;
        }
        connection.query('SELECT @result', (error, results) => {
            if (error) {
                logger.log('error', 'No se pudo identificar al usuario');
                result(error, null);
                return;
            }
            result(null, JSON.stringify(results[0]["@result"]))
            return;
        });
    });
}


Usuario.insertarUsuarioMasivo =  (datos, result) => {
    const value = [datos.map(datos => [datos.nombres, datos.apellidoPaterno,datos.apellidoMaterno,datos.codigoPUCP,datos.correo,datos.correo2,datos.celular, datos.usuarioCreacion])];
    const connection = getConnection.getConnection();
    var sql1 = "CREATE TABLE temp_Esp (idTemp int NOT NULL AUTO_INCREMENT, nombres varchar(100) NOT NULL,apellidoPaterno varchar(100) NOT NULL,apellidoMaterno varchar(100) DEFAULT NULL,codigoPUCP varchar(12) NOT NULL," +
        " correo varchar(200) NOT NULL, correo2 varchar(200) DEFAULT NULL, celular varchar(10) DEFAULT NULL, usuarioCreacion int NOT NULL, PRIMARY KEY (idTemp));"
    connection.query(sql1, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo crear tabla' + error.stack);
        }
        console.log("Se crea Tabla");
        var sql2 = 'INSERT IGNORE INTO temp_Esp (nombres,apellidoPaterno,apellidoMaterno,codigoPUCP,correo,correo2,celular,usuarioCreacion) VALUES ?';

        connection.query(sql2, value, function (error, results) {
            if (error) {
                logger.log('error', 'No se pudo insertar' + error.stack);
            }
            console.log('Bulk insert realizado exitosamente.');
            var sql3 = 'call InsertarUsuariosTodos();';
            connection.query(sql3, function (error, results2) {
                if (error) {
                    logger.log('error', 'No se pudo validar los usuarios' + error.stack);
                    return null;
                }
                console.log("Se inserta los datos");
                console.log("resultados de insercion: "+results2[0][0]['insertados'])
                /*var queryCorreos = 'SELECT correo FROM Usuario ORDER BY idUsuario DESC LIMIT ' + 
                    results2[0][0]['insertados'];
                //console.log(queryCorreos);
                try{
                    new Promise((resolve, reject) => {
                        const connection2 = getConnection.getConnection();
                        connection2.query(queryCorreos, function (error, resultados) {
                            if (error) {
                                logger.log('error', 'No se pudo listar los datos de usuarios' + error.stack);
                                return;
                            }
                            for (let i = 0; i < resultados.length; i++) {
                                var dato = resultados[i];
                                // Accedemos a las propiedades "correo" y "correo2" de cada objeto
                                var correo = dato.correo;
                                //var correo2 = dato.correo2;
                                var destino= correo 
                                let texto="Bienvenido a AcrediPUCP, puede visitar el sistema en el siguiente enlace: https://acredita.inf.pucp.edu.pe/"
                                envioCorreo.enviarCorreo(destino,'Bienvenido a AcrediPUCP',texto);
                                console.log("envie: " + destino + texto);
                            }
                            resolve()
                            //return;
                        });
                    })
                }
                catch(error){
                    logger.log('error',error);
                }*/
                Usuario.correosMasivosBienvenida(results2[0][0]['insertados']);
                result(null, results2[0]);

                //hago un select e los X ultimos y a esos le mando correo
                /* var queryCorreos = 'SELECT correo, correo2 FROM Usuario ORDER BY idUsuario DESC LIMIT ' + 
                results2[0]['insertados']*/
                // ahora, a eso le hago un results y por cada fila llamo a mandar correo
                //prueba
                
                var sql5 = 'DROP TABLE temp_Esp;';
                connection.query(sql5, function (error, results) {
                    if (error) {
                        logger.log('error', 'No se pudo listar los usuarios' + error.stack);
                        return null;
                    }
                    console.log("Se  borra tabla");
                    return;
                });
            });
        });
    });
}



const enviarCorreoBatch = async (correos) => {
    for (let i = 0; i < correos.length; i++) {
      try {
        const correo = correos[i];
        const destino = correo.correo;
        const texto = 'Bienvenido a AcrediPUCP, puede visitar el sistema en el siguiente enlace: https://acredita.inf.pucp.edu.pe/ \n \nSi es su primera vez en el sistema registre su contraseña usando la opcion de "¿Olvidó su contraseña?"'
        await envioCorreo.enviarCorreo(destino, 'Bienvenido a AcrediPUCP', texto);
        console.log("Correo enviado a: " + destino);
      } catch (error) {
        // Manejar el error adecuadamente, por ejemplo, registrar y reintentar más tarde.
        logger.log('error', error);
      }
    }
  };
  
  Usuario.correosMasivosBienvenida = async (cantidad) => {
    const connection2 = getConnection.getConnection();
    const queryCorreos = 'SELECT correo FROM Usuario ORDER BY idUsuario DESC LIMIT ' + cantidad;
  
    try {
      await new Promise((resolve, reject) => {
        connection2.query(queryCorreos, function (error, resultados) {
          if (error) {
            logger.log('error', 'No se pudo listar los datos de usuarios' + error.stack);
            return reject(error);
          }
  
          // Agrupar los correos en lotes
          const correosPorLotes = [];
          const tamañoLote = 10; // Define el tamaño del lote que quieres enviar
          for (let i = 0; i < resultados.length; i += tamañoLote) {
            correosPorLotes.push(resultados.slice(i, i + tamañoLote));
          }
  
          // Procesar los lotes en secuencia
          correosPorLotes.reduce(async (previousPromise, currentBatch) => {
            await previousPromise;
            await enviarCorreoBatch(currentBatch);
          }, Promise.resolve());
  
          resolve();
        });
      });
    } catch (error) {
      logger.log('error', error);
    }
  };


Usuario.modificarUsuario2 = (idUsuario, correo2, celular, usuarioCreacion, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ModificarUsuario2(?,?,?,?)";
    var value = [
        idUsuario,
        correo2,
        celular,
        usuarioCreacion
    ];
    console.log(value);
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo modificar al usuario');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}




Usuario.listarUsuario = (usuario, result) => {
    if (/%/.test(usuario.body.nombre_id)) {
        console.log("La cadena contiene el carácter '%'.");
        result(null)
        return;
    } 
    const connection = getConnection.getConnection();
    var sql = "CALL ListarUsuario(?)";
    var value = [
        usuario.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar usuarios');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Usuario.listarUsuario2 = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarUsuario2(?)";
    var value = [
        usuario.body.nombre_id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo listar usuarios');
            result(error, null);
            return;
        }
        console.log(results[0]);
        result(null, results[0])
        return;
    });
}

Usuario.modificarUsuario = (usuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ModificarUsuario(?,?,?,?,?,?,?,?,?)";
    var value = [
        usuario.idUsuario,
        usuario.nombres,
        usuario.apellidoPaterno,
        usuario.apellidoMaterno,
        usuario.codigoPUCP,
        usuario.correo,
        usuario.correo2,
        usuario.celular,
        usuario.usuarioCreacion
    ];
    console.log(value);
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo modificar al usuario');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Usuario.verificarUsuario = (correo, contrasenia, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL VerificarUsuario(?,?)";
    var value = [
        correo,
        contrasenia
    ];
    connection.query(sql, value, function (error, results) {
        if (error) {
            logger.log('error', 'No se pudo comprobar el login de usuario');
            result(error, null);
            return;
        }
        console.log(results[0][0]["canti1"])
        result(null, results[0][0]["canti1"])
        return;
    })

};

Usuario.buscarUsuarioXCorreo = (correo, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL BuscarUsuarioXCorreo(?)";
    var value = [
        correo
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo enviar la informacion del usuario');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    })

}

Usuario.listarPerfiles = (idUsuario, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL ListarPerfilRutas(?)";
    var value = [
        idUsuario
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo enviar listar los perfiles del usuario ');
            result(error, null);
            return;

        }
        result(null, results[0])
        return;
    })

}
Usuario.deshabilitarUsuario = (usuario, id, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL DeshabilitarUsuario(?,?)";
    var value = [
        usuario,
        id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo deshabilitar Usuario');
            result(error, null);
            return;
        }
        console.log(usuario)
        result(null, true)
        return;
    });
}

Usuario.habilitarUsuario = (usuario, id, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL HabilitarUsuario(?,?)";
    var value = [
        usuario,
        id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo activar Usuario');
            result(error, null);
            return;
        }
        result(null, true)
        return;
    });
}


Usuario.fotoUsuario = (id, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL FotoUsuario(?)";
    var value = [
        id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo activar Usuario');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}

Usuario.fotoUsuario2 = (id, result) => {
    const connection = getConnection.getConnection();
    var sql = "CALL FotoUsuario2(?)";
    var value = [
        id
    ];
    connection.query(sql, value, (error, results) => {
        if (error) {
            logger.log('error', 'No se pudo activar Usuario');
            result(error, null);
            return;
        }
        result(null, results[0])
        return;
    });
}



module.exports = Usuario;