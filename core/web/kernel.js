const express = require("express");
const session = require("express-session");
const server = express();
const bodyParser = require("body-parser");
const passport = require('passport');

const logger = require('../../../utils/Logger').setPrefix('FoxProx');

const fs = require("fs");
const https = require('https');

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, server);

// SERVERS IMPORT
const AuthServer = require('./server/auth/index');
const DataServer = require('./server/api/index');

// PUBLIC WEBAPP

const Dashboard = require('./client/dashboard/index');
const Feedbacks = require('./client/feedback/index');
const Support = require('./client/support/index');

const engine = require('express-engine-jsx');

module.exports.bootloader = async function (environement, client) {
	server.use(express.static('public'));
	server.set('view engine', 'jsx');
	server.engine('jsx', engine);

	server.get("/", async (req, res) => {
		res.status(200).json({
			data: {
				apiVersion: client.version,
				apiRevision: client.revision,
				apiAuthor: 'NebraskyTheWolf <farfy.dev@gmail.com>',
				apiName: 'GHIDORAH',
				apiSig: client.prints,
				maintenance: client.IsDebug
			}
		});
	});

	server.use(session({ secret: `${client.fingerprint}`, resave: false, saveUninitialized: false }));
	server.use(bodyParser.json());
	server.use(passport.initialize());
	server.use(passport.session());

	server.use(async function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,POST');
		res.header('Access-Control-Allow-Headers', 'Content-Type');

		next();
	});

	logger.log('INFO', `Starting server to ${environement} mode..`);

	switch (environement) {
		case "FULL": {
			await AuthServer.starts(server, client);
			await DataServer.starts(server, client);

			await Dashboard.starts(server, client);
			await Feedbacks.starts(server, client);
			await Support.starts(server, client);
		}
			break;
		case "API_ONLY": {
			await AuthServer.starts(server, client);
			await DataServer.starts(server, client);
		}
			break;
		case "SERVERLESS": {
			logger.log('WARN', `---`);
			logger.log('WARN', `Serverless enabled ALL WEBAPP WILL BE DISABLED!`);
		}
			break;
		default:
			logger.log('INFO', `${environement} not exist. Serverless mode enabled.`);
			break;
	}

	server.use(function (req, res, next) {
		res.status(404)
		// respond with json
		res.json({ status: false, error: 'Method not found.' });
		logger.log('ERROR', `${req.baseUrl} - ${res.statusCode}`);
	});

	server.use(function (err, req, res, next) {
		res.status(500).json({ status: false, error: 'An error has occured.' });
		logger.log('ERROR', `${req.baseUrl} - ${res.statusCode}`);
	});
}

httpsServer.listen(443);
logger.log('INFO', `Server listening on port 443`);