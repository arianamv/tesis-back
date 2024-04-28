var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/.env.production' 
          : __dirname + '/.env.development'
});
var app = express();

//inicia el motor de vistas

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;