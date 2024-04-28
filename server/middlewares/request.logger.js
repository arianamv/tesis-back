var logger = require('../config/winston');

function loggeruse(req, res, next) {
    let requestBody = (typeof req.body !== 'string') ? JSON.stringify(req.body) : req.body;
    logger.log('info', 'METHOD="'+req.method + '";' + ' PATH="' + req.path + '";' + ' REQUEST=' + requestBody);
    const oldJson = res.json;
    res.json = (body) => {
        res.locals.body = body;
        //console.log(res.locals.body);
        logger.log('info', 'RESPONSE=' + JSON.stringify(res.locals.body));
        logger.log('info', '--------------------------------------------------');
        return oldJson.call(res, body);
    };
    next();
}

module.exports = loggeruse;