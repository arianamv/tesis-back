const getConnection = require('../../config/database');
const db = require('../../models/index');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/usuario/usuario.model');
const logger  = require( '../../config/winston');
const envioCorreo = require('../../models/cuenta/correo.model');


exports.usuarioInsertar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if(token){
        const decoded = jwt.decode(token);
        const usuario = new Usuario(1,req.body.codigoPUCP,req.body.apellidoPaterno,req.body.apellidoMaterno,req.body.nombres,
            req.body.correo,req.body.correo2,req.body.celular,req.body.contrasenia,decoded.id,req.body.rutaFoto);
        db.User.insertarUsuario(usuario,(err,dataUsuario)=>{
            if(err){
                if(err.sqlState==45000){//Entrada repetida
                    res.json({
                        success: false,
                        error: {
                            "message": err.sqlMessage
                        }
                    });
                    return;
                }
                
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            //envio el correo
            let destino = req.body.correo;
            let texto='Bienvenido a AcrediPUCP, puede visitar el sistema en el siguiente enlace: https://acredita.inf.pucp.edu.pe/ \n \nSi es su primera vez en el sistema registre su contraseña usando la opcion de "¿Olvidó su contraseña?"'
            envioCorreo.enviarCorreo(destino,'Bienvenido a AcrediPUCP',texto);
            console.log("envie: " + destino + texto)
            res.json({
                success: true,
                idUsuario: dataUsuario
            });   
        }) 
    }
    else{
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}

exports.usuarioInsertarMasivo = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if(token){
        const decoded = jwt.decode(token);
        var json = [];
        for (var i = 0; i < req.body.elementos.length; i++) {
            var objeto = {};
            objeto.nombres=req.body.elementos[i].Nombre;
            objeto.apellidoPaterno=req.body.elementos[i].ApellidoPaterno;
            objeto.apellidoMaterno=req.body.elementos[i].ApellidoMaterno;
            objeto.celular=req.body.elementos[i].Celular;
            objeto.codigoPUCP=req.body.elementos[i].Codigo;
            objeto.correo=req.body.elementos[i].Correo;
            objeto.correo2=req.body.elementos[i].CorreoSecundario;
            objeto.usuarioCreacion = decoded.id;
            json.push(objeto);
        }
        console.log(json);
        db.User.insertarUsuarioMasivo(json,(err,dataUsuario)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            res.json({
                success: true,
                idUsuario: dataUsuario
            });   
        }) 
    }
    else{
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}

exports.usuarioListar = async (req, res) => {
    try {
    db.User.listarUsuario(req,(err,dataUsuario)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            console.log(dataUsuario);
            if(dataUsuario==null){
                res.json({
                    success: false,
                    Usuario: [],
                    totalFilas: 0,
                    totalPaginas: 0
                }); 
                return;
            }
            const { startIndex, endIndex } = req.pagination;
            console.log(typeof dataUsuario)
            const totalFilas=Object.keys(dataUsuario).length
            const totalPaginas= Math.ceil(Object.keys(dataUsuario).length / 10);
            const usuarios = dataUsuario.slice(startIndex, endIndex);
            res.json({
                success: true,
                Usuario: usuarios,
                totalFilas: totalFilas,
                totalPaginas: totalPaginas
            }); 
    }) 
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}

exports.usuarioModificar= async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if(token){
        const decoded = jwt.decode(token);
        const usuario = new Usuario(req.body.idUsuario,req.body.codigoPUCP,req.body.apellidoPaterno,req.body.apellidoMaterno,req.body.nombres,
            req.body.correo,req.body.correo2,req.body.celular,req.body.contrasenia,decoded.id,req.body.rutaFoto);
        db.User.modificarUsuario(usuario,(err,dataUsusario)=>{
                if(err){
                    if(err.sqlState==45000){//Entrada repetida
                        res.json({
                            success: false,
                            error: {
                                "message": err.sqlMessage
                            }
                        });
                        return;
                    }
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
                res.json({
                    success: true,
                });   
        }) 
    }
    else{
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}

/////////////////////////////S3 RETORNA IMAGEN DE USUARIO 
/////////////////////////////S3 RETORNA IMAGEN DE USUARIO 
const {getSignUrlForFile} = require('../../config/S3');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../.env.production' 
          : __dirname + '/../.env.development'
});
const {
    S3Client,
} = require("@aws-sdk/client-s3");

const s3Config = {
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET
    },
};

const s3Client = new S3Client(s3Config);
exports.usuarioMostrar = async (req, res) => {
    try {
    db.User.listarUsuario2(req,(err,dataUsuario)=>{
        if(err){
            res.json({
                success: false,
                error: {
                    "message": err.message
                }
            });
            return;
        }
        if (Object.keys(dataUsuario).length === 0) {
            logger.log('error','Usuario no existe en la Base de Datos');
            res.json({
                success: false,
                error: {
                    "codigo": 1,
                    "message": "Usuario no existe en la Base de Datos"
                }
            });
            return;
        }//codigoPUCP
        db.User.listarPerfiles(dataUsuario[0]["idUsuario"],(err,dataPerfil)=>{
            if(err){
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            db.User.fotoUsuario(req.body.nombre_id,(err,dataFoto)=>{
                if(err){
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
                const url = (dataFoto[0]["valor"]==1) ? getSignUrlForFile( req.body.nombre_id + ".jpg") : getSignUrlForFile( "FotoPerfil.png");
                url.then(result => {
                    res.json({
                        success: true,
                        usuario: dataUsuario,
                        perfiles: dataPerfil,
                        Foto: result
                    });
                }).catch(error => {
                    console.error(error);
                });
            })
        })    
    })
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}
///////////////////////

    
exports.usuarioDeshabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if(token){
        const decoded = jwt.decode(token);
        for (let propiedad in req.body) {
            db.User.deshabilitarUsuario(propiedad,decoded.id,(err,dataUsuario)=>{
                if(err){
                    res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }});
                    return;
                }
            }) 
            
        }
        res.json({
        success: true
        });
    }
    else{
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}
exports.usuarioHabilitar = async (req, res) => {
    try {
    const authorizationHeader = req.headers['authorization'];
    var token;
    
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if(token){
        const decoded = jwt.decode(token);
        for (let propiedad in req.body) {
            db.User.habilitarUsuario(propiedad,decoded.id,(err,dataUsuario)=>{
                if(err){
                    res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }});
                    return;
                }
            }) 
        }
        res.json({
        success: true
        });
    }
    else{
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
    } catch (errorTRY) {
        logger.log('error',errorTRY.message);
        res.json({
            success: false,
            error: {
                "message": "Error en el servidor"
            },
            "message": "Error en el servidor"
        });
    }
}
// exports.usuarioFoto = async (req, res) => {
//     const authorizationHeader = req.headers['authorization'];
//     var token;
//     if (authorizationHeader) {
//         token = authorizationHeader.split(' ')[1];
//     }
//     if(token){
//         const decoded = jwt.decode(token);
//         deleteObject((decoded.id).toString());
//         const bucketParams = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: (decoded.id).toString(),
//             Body: files
//         };
//         try {
//             const data = await s3Client.send(new PutObjectCommand(bucketParams));
//             res.send(data)
//             return;
//         } catch (err) {
//             console.log("No se pudo subir la foto del Usuario", err);
//             return;
//         }
//     }
//     else{
//         res.json({
//             success: false,
//             message: "No hay token enviado"
//         });
//     }
// }

// app.post("/upload", async (req, res) => {
//     const file = req.files.file;
//     const fileName = req.files.file.name;

//     const bucketParams = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: fileName,
//         Body: file.data,
//     };
//     console.log((bucketParams))
//     console.log()
//     console.log(s3Config);

//     try {
//         const data = await s3Client.send(new PutObjectCommand(bucketParams));
//         res.send(data)
//     } catch (err) {
//         console.log("Error12343214", err);
//     }
// });

// app.get('/download', async (req, res, next) => {
//     var fileKey = req.body.fileKey;

//     var bucketParams = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: fileKey,
//     };

//     res.attachment(fileKey);
//     var fileStream = await s3Client.send(new GetObjectCommand(bucketParams));
    
//     fileStream.Body.pipe(res)
// });
// /////////////////