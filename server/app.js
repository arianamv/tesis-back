var app = require('./config/express');
var jwt = require('jsonwebtoken');
var createError = require('http-errors');
var routes = require('./routes/index.route');
var requestLogger = require('./middlewares/request.logger');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/.env.production' 
          : __dirname + '/.env.development'
});
var session = require("express-session");
require('./middlewares/googleAuth');
var passport = require('passport');
var db = require('./models/index');

/**
 * Cors
 */

var cors = require("cors");

var corsOpcion = {
    origin: true,
    credentials: true,
    exposeHeaders: ['Content-Disposition']
}
app.use(cors(corsOpcion));


/**
 * Passport para el uso de Oauth2.0  (INICIAR SESION CON GOOGLE)
 */

// //Passport para el uso de Oauth2.0
// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// //Request logger
// app.use(requestLogger);

// app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// //autorizadorRouter.post('/auth/google',autorizadorController.loginGoogle);


// app.get('/auth/google/callback', (req, res, next) => {
//     passport.authenticate('google', async (error, email, info) => {
//         console.log("Error1 es " + email)
//         if (error) {
//             console.log("Error1" + error)
//             res.redirect(process.env.APP_DOMAIN + '/error');
//         }
//         if (email) {
//             try {
//                 // your success cod

//                 db.User.buscarUsuarioXCorreo(email, (err, dataUsuario) => {
//                     if (err) {
//                         res.redirect(process.env.APP_DOMAIN + '/error');
//                         return;
//                     }
//                     console.log("Esta es la data usuario:" + JSON.stringify(dataUsuario[0]["idUsuario"]))
//                     db.User.listarPerfiles(dataUsuario[0]["idUsuario"], (err, dataPerfiles) => {
//                         if (err) {
//                             res.redirect(process.env.APP_DOMAIN + '/error');
//                             return;
//                         }
//                         const token = jwt.sign({
//                             id: dataUsuario[0]["idUsuario"],
//                             email: email
//                         }, process.env.TOKEN_SECRET_KEY);

//                         res.cookie('jwt', token)
//                         res.redirect(process.env.APP_DOMAIN + '/inicio');
//                     });
//                 })
//                 // return res.send({
//                 //     data: email,
//                 //     message:'Login Successful' 
//                 //  });
//             } catch (error) {
//                 // error msg 
//                 return res.send({ message: error.message });
//             }
//         } else {
//             res.redirect(process.env.APP_DOMAIN + '/error');
//             return;
//         }
//     })(req, res, next);

// })


/**
 * Router
 */

app.use('/api', routes);


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
