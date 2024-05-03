var express = require('express');
var router = express.Router();

var usuarioRouter = require('./usuario/usuario.route');
var campañaRouter = require('./campaña/campaña.route');
var cultivoRouter = require('./cultivo/cultivo.route');
var fundoRouter = require('./fundo/fundo.route');
var loteRouter = require('./lote/lote.route');
var pesticidaRouter = require('./pesticida/pesticida.route');
var plagaRouter = require('./plaga/plaga.route');
var coordenadaRouter = require('./coordenada/coordenada.route')

router.use('/usuario', usuarioRouter);
router.use('/campania', campañaRouter);
router.use('/cultivo', cultivoRouter);
router.use('/fundo', fundoRouter);
router.use('/lote', loteRouter);
router.use('/pesticida', pesticidaRouter);
router.use('/plaga', plagaRouter);
router.use('/coordenada', coordenadaRouter);

module.exports = router;