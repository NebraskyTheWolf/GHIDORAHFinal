const fs = require('fs');
const logger = require('./Logger');
const authentication = require('../web/server/middlewares/Authentication');

module.exports.load = function (server, side, service, routes) {
    logger.setPrefix(`ROCKET - ${service}`);

    let basePath = '../web/' + side + '/' + service + '/app/controller/';

    if (fs.existsSync(basePath)) {
        if (process.env.DEBUG) {
            logger.log('INFO', 'Registering controllers and routes...');
            logger.log('INFO', '--> ' + service);
            logger.log('INFO', '--> ' + basePath);
            logger.log('INFO', '--> ' + side.toUpperCase());
            logger.log('INFO', '-------------------------------------');
        }

        for (var route in routes) {
            if (route.split(' ').length > 1) {
                var method = route.split(' ')[0];
                var url = route.split(' ')[1];
            } else {
                var method = 'get';
                var url = route;
            }
            if (typeof routes[route] === 'string') {
                var controller = routes[route].split('.')[0];
                var action = routes[route].split('.')[1];
            } else {
                var controller = routes[route].function.split('.')[0];
                var action = routes[route].function.split('.')[1];

                if (routes[route].protected) {
                    server[method](url, authentication, require(basePath + controller)[action]);
                    if (process.env.DEBUG) {
                        logger.log('DEBUG', `${url} - ${controller}::${action} [REGISTERED] // PROTECTED //`);
                    }
                    continue;
                }
            }
            // init route
            server[method](url, require(basePath + controller)[action]);

            if (process.env.DEBUG) {
                logger.log('DEBUG', `${url} - ${controller}::${action} [REGISTERED] // UNPROTECTED //`);
            }
        }
    } else {
        logger.log('ERROR', `${basePath} controller directory is invalid!`);
    }
} 