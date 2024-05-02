const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const getConnection = require('./config/database');

var cors = require("cors");

var corsOpcion = {
    origin: true,
    credentials: true,
    exposeHeaders: ['Content-Disposition']
}
app.use(cors(corsOpcion));


var port = normalizePort(process.env.APP_PORT || '3050');
app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));

app.use("/api", require('./routes/index.route'));

app.listen(app.get('port'), () => {
    console.log('Server on port ', port);
})

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