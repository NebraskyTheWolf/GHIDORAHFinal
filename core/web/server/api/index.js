module.exports.starts = async function (server, client) {
	client.SecLoader.load(server,
		'server', 'api',
		require('./app/config/routes')
	);
};