var express = require('express');
var router = express.Router();

var usuarioRouter = require('./usuario/usuario.route');
router.use('/usuario', usuarioRouter);
module.exports = router;