const authentication = require('../middlewares/Authentication');

module.exports.starts = async function (server, client) {
	client.SecLoader.load(server,
		'server', 'auth',
		require('./app/config/routes')
	);
};