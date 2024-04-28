var cicloAcademicoController = require('./controllers/medicion/cicloacademico.controller');
var app = require('./config/express');
var jwt = require('jsonwebtoken');
var createError = require('http-errors');
var routes = require('./routes/index.route');
var scripts = require('./scripts/index.scripts');
var requestLogger = require('./middlewares/request.logger');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/.env.production' 
          : __dirname + '/.env.development'
});
var session = require("express-session");
require('./middlewares/googleAuth');
var passport = require('passport');
var db = require('./models/index')
var cors = require("cors");
var iconv = require('iconv-lite');
//var cron = require('node-cron');
//var domainsFromEnv=process.env.CORS_DOMAINS || "";
//var whitelist=domainsFromEnv.split(",").map(item=>item.trim());

var corsOpcion = {
    origin: true,
    credentials: true,
    exposeHeaders: ['Content-Disposition']
}
app.use(cors(corsOpcion));

//////////////////////////////////////////////////////////// carga masiva
const upload = require('./middlewares/multer');
const xlsx = require('xlsx');
app.post('/profile', passport.authenticate(['jwt'], { session: false }), upload.single('archivo'), async (req, res) => {
    const archivo = req.file;
    const workbook = xlsx.readFile(archivo.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    db.EspacioMedicion.bucketInsert(jsonData, (err, data) => {
        if (err) {
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
            datos: data,
            cantidadCorrecta: data.length,
            total: jsonData.length
        });
    })
});

////////////////////////////////////////////////////////S3 AGREGAR FOTO DE PERFIL BY USUARIO

var fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFile: true }))

const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

var s3Config;

if (process.env.NODE_ENV === 'production') {
    s3Config = {
        region: "us-east-1",
    };
} else {
    s3Config = {
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_ACCESS_SECRET,
            sessionToken: process.env.AWS_SESSION_TOKEN
        },
    };
}

const s3Client = new S3Client(s3Config);

const { deleteObject } = require('../server/config/S3');

app.post("/upload", passport.authenticate(['jwt'], { session: false }), async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    var token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if (token) {
        const decoded = jwt.decode(token);

        deleteObject((req.body.idUsuario).toString() + ".jpg");
        const file = req.files.file;
        const bucketParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: req.body.idUsuario + ".jpg",
            Body: file.data
        };
        try {
            db.User.fotoUsuario2(req.body.idUsuario, (err, dataFoto) => {
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
                const data = s3Client.send(new PutObjectCommand(bucketParams));
                res.json({
                    success: true
                });
                return;
            });
        } catch (err) {
            console.log("No se pudo subir la foto del Usuario", err);
            return;
        }
    }
    else {
        res.json({
            success: false,
            message: "No hay token enviado"
        });
    }
});

app.post("/uploadEvidencia", passport.authenticate(['jwt'], { session: false }), async (req, res) => {
    // Acceder a los archivos del formulario
    console.log("BODY:")
    console.log(req.body)
    console.log("FILE:")
    console.log("FILES:")
    console.log(req.files.file)

    const archivosExcel = req.files.file; // Aquí accedes a los archivos Excel enviados como un array
    // Iterar sobre los archivos Excel

    console.log(archivosExcel.length);

    if (archivosExcel.length == null) {
        const archivo = archivosExcel;

        const decodedFileName = iconv.decode(new Buffer.from(archivo.name, 'binary'), 'utf-8');
     
        console.log('Nombre del archivo:', archivo.name);
        console.log('Tamaño del archivo:', req.body.idCompetencia);
        db.Competencia.insertarEvidencia1(req.body.idCompetencia, req.body.idMuestra,req.body.idIndicador, (err, idCompetenciaXMuestra) => {
            console.log("ViendoInsertar1")
            console.log(idCompetenciaXMuestra)

            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            db.Competencia.insertarEvidencia2(idCompetenciaXMuestra, decodedFileName, (err, idDetalleCompetenciaXMuestra) => {

                console.log("ViendoInsertar2")
                console.log(idDetalleCompetenciaXMuestra)
                console.log("Nombre")
                console.log(archivo.name)

                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
                                                                 
                const bucketParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: idDetalleCompetenciaXMuestra + '-' + idCompetenciaXMuestra + '-' + req.body.idCompetencia + '-' + req.body.idIndicador + '-' + req.body.idMuestra + '-' + decodedFileName,
                    Body: archivo.data
                };

                try {
                    const data = s3Client.send(new PutObjectCommand(bucketParams));
                    console.log(data);

                } catch (err) {
                    if (err) {
                        res.json({
                            success: false,
                            error: {
                                "message": err.message
                            }
                        });
                        return;
                     }
                 };
            });

            res.json({
                success: true
            });
            return;
        });

    } else {
        for (const archivo of archivosExcel) {
            if (archivo == null) break;
            const decodedFileName = iconv.decode(new Buffer.from(archivo.name, 'binary'), 'utf-8');
            

            console.log('Nombre del archivo:', archivo.name);
            console.log('Tamaño del archivo:', req.body.idCompetencia);
            db.Competencia.insertarEvidencia1(req.body.idCompetencia, req.body.idMuestra, req.body.idIndicador, (err, idCompetenciaXMuestra) => {
                console.log("ViendoInsertar1")
                console.log(idCompetenciaXMuestra)

                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
                db.Competencia.insertarEvidencia2(idCompetenciaXMuestra, decodedFileName, (err, idDetalleCompetenciaXMuestra) => {

                    console.log("ViendoInsertar2")
                    console.log(idDetalleCompetenciaXMuestra)
                    console.log("Nombre")
                    console.log(archivo.name)
                    if (err) {
                        res.json({
                            success: false,
                            error: {
                                "message": err.message
                            }
                        });
                        return;
                    }
                    const bucketParams = {
                        Bucket: process.env.AWS_S3_BUCKET_NAME,
                        Key: idDetalleCompetenciaXMuestra + '-' + idCompetenciaXMuestra + '-' + req.body.idCompetencia + '-' + req.body.idIndicador + '-' + req.body.idMuestra + '-' + decodedFileName,
                        Body: archivo.data
                    };
                    try {
                        const data = s3Client.send(new PutObjectCommand(bucketParams));
                        console.log(data);

                    } catch (err) {
                        res.json({
                            success: false,
                            error: {
                                "message": err.message
                            }
                        });
                        return;

                    }
                });
            });
        }
        res.json({
            success: true
        });
    }
});


app.post("/uploadEvidenciaActividad", passport.authenticate(['jwt'], { session: false }), async (req, res) => {
    // Acceder a los archivos del formulario

    const archivosExcel = req.files.file; // Aquí accedes a los archivos Excel enviados como un array
    // Iterar sobre los archivos Excel
    console.log("SUBIENDO:")
    console.log(archivosExcel)
    if (archivosExcel.length == null) {
        const archivo = archivosExcel;

        /* if (err) {
             res.json({
                 success: false,
                 error: {
                     "message": err.message
                 }
             });
             return;
         }*/

         console.log("UN SOLO UPLOAD")
         const decodedFileName = iconv.decode(new Buffer.from(archivo.name, 'binary'), 'utf-8');
        db.Actividad.insertarEvidencia2(req.body.idActividad, decodedFileName, (err, idDetalleEvidenciaActividad) => {
            console.log(decodedFileName)
            console.log("ARchivo nulo")
            if (err) {
                res.json({
                    success: false,
                    error: {
                        "message": err.message
                    }
                });
                return;
            }
            const bucketParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: 'arcActividad-' + idDetalleEvidenciaActividad + '-' + req.body.idActividad + '-' + decodedFileName,
                Body: archivo.data
            };
            try {
                const data = s3Client.send(new PutObjectCommand(bucketParams));
                console.log(data);

            } catch (err) {
                console.log("No se pudo subir el archivo", err);

            }
        });
        res.json({
            success: true
        });
        return;
    } else {
        console.log("VARIOS UPLOADS")
        for (const archivo of archivosExcel) {
            if (archivo == null) break;
            console.log('Nombre del archivo:', archivo.name);

            const decodedFileName = iconv.decode(new Buffer.from(archivo.name, 'binary'), 'utf-8');
      

            db.Actividad.insertarEvidencia2(req.body.idActividad, decodedFileName, (err, idDetalleEvidenciaActividad) => {

                console.log("ViendoInsertar2")
                console.log(idDetalleEvidenciaActividad)
                console.log("Nombre")
                console.log(archivo.name)
                if (err) {
                    res.json({
                        success: false,
                        error: {
                            "message": err.message
                        }
                    });
                    return;
                }
                const bucketParams = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: 'arcActividad-' + idDetalleEvidenciaActividad + '-' + req.body.idActividad + '-' + decodedFileName,
                    Body: archivo.data
                };
                try {
                    const data = s3Client.send(new PutObjectCommand(bucketParams));
                    console.log(data);

                } catch (err) {
                    console.log("No se pudo subir el archivo", err);

                }
            });
        }
        res.json({
            success: true
        });
    }
});
////////////////////////////////////////

//Passport para el uso de Oauth2.0
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Request logger
app.use(requestLogger);

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
//autorizadorRouter.post('/auth/google',autorizadorController.loginGoogle);


app.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', async (error, email, info) => {
        console.log("Error1 es " + email)
        if (error) {
            console.log("Error1" + error)
            res.redirect(process.env.APP_DOMAIN + '/error');
        }
        if (email) {
            try {
                // your success cod

                db.User.buscarUsuarioXCorreo(email, (err, dataUsuario) => {
                    if (err) {
                        res.redirect(process.env.APP_DOMAIN + '/error');
                        return;
                    }
                    console.log("Esta es la data usuario:" + JSON.stringify(dataUsuario[0]["idUsuario"]))
                    db.User.listarPerfiles(dataUsuario[0]["idUsuario"], (err, dataPerfiles) => {
                        if (err) {
                            res.redirect(process.env.APP_DOMAIN + '/error');
                            return;
                        }
                        const token = jwt.sign({
                            id: dataUsuario[0]["idUsuario"],
                            email: email
                        }, process.env.TOKEN_SECRET_KEY);

                        res.cookie('jwt', token)
                        res.redirect(process.env.APP_DOMAIN + '/inicio');
                    });
                })
                // return res.send({
                //     data: email,
                //     message:'Login Successful' 
                //  });
            } catch (error) {
                // error msg 
                return res.send({ message: error.message });
            }
        } else {
            res.redirect(process.env.APP_DOMAIN + '/error');
            return;
        }
    })(req, res, next);

})


//Cron job para la insercion de ciclos academicos
/* 
cron.schedule('15 11 30 May *', () => {
    console.log('Insercion de nuevo ciclos academicos:');
    let req;
    let res = {
        json(objeto) {
            if (objeto.success === true) console.log("Se inserto " + objeto.ciclo);
            else console.log("No se inserto " + objeto.ciclo);
        }
    };
    const anio = (new Date().getFullYear() + 4).toString();
    for (let i = 0; i <= 2; i++) {
        req = { body: { anio: anio, semestre: i.toString() } };
        cicloAcademicoController.cicloAcademicoInsertar(req, res);
    }
});
 */

//ROUTER

app.use('/api', routes);
//app.use('/api', routesMedicion);

// Atrapa 404 y redirige al error handler
app.use(function (req, res, next) {
    next(createError(404));

});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // muestra error
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Dependencias
 */

var debug = require('debug')('acredipucp:server');
var http = require('http');

/**
 * Conseguir puerto y guardarlo en Express
 */

var port = normalizePort(process.env.APP_PORT || '3050');
app.set('port', port);

/**
 * Lanzar servidor HTTP
 */

var server = http.createServer(app);

/**
 * Escucha en el puerto proporcionado en todas las interfaces de red
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normaliza un puerto en un numero, cadena o falso
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // pipe
        return val;
    }

    if (port >= 0) {
        // puerto
        return port;
    }

    return false;
}

/**
 * Escucha el evento error para el servidor
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // Responde a errores específicos con mensajes
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Escucha el evento "listening" del servidor HTTP
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


module.exports = app;
