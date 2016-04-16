var app = require('./index'),
    config = require('./config'),
    log = require('./logger');

log.info('Server process starting');

app.listen(config.express.port, config.express.ip,  function (err) {

    if (err) {
        log.error({error: err}, 'Unable to listen for connections');
        process.exit(10);
    }

    log.info('Express is listening on http://' + config.express.host + ' port ' + config.express.port);
});