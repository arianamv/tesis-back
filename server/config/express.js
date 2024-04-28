var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/.env.production' 
          : __dirname + '/.env.development'
});
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;