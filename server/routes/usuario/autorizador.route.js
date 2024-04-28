var express = require('express');
var autorizadorRouter = express.Router();
var autorizadorController = require('../../controllers/usuario/autorizador.controller');
var passport = require('passport');

autorizadorRouter.post('/login', autorizadorController.login);
autorizadorRouter.post('/loginGoogle', passport.authenticate('google'), (req, res) =>
    res.send(200)
);
autorizadorRouter.post('/loginGoogle/redirect', passport.authenticate('google'), (req, res) =>
    console.log(req)

);


module.exports = autorizadorRouter;
