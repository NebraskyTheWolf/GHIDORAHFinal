const Logger = require('../core/utils/Logger')
    .setPrefix("GSYNC");
const config = require('./config/gsync.json');
const constant = require('./util/Constant');
const fetch = require('node-fetch');

const fs = require('fs');
const runDir = "/usr/share/GHIDORAH/"

const GSYNC_REPO = "https://github.com/NebraskyTheWolf/GSync";

const GSYNC_REPO_MANIFEST_VERSION = "https://raw.githubusercontent.com/NebraskyTheWolf/GSync/main/manifest/_version.json";
const GSYNC_REPO_MANIFEST_DOWNLOAD = "https://raw.githubusercontent.com/NebraskyTheWolf/GSync/main/manifest/_downloadable.json";
const GSYNC_REPO_MANIFEST_ENV = "https://raw.githubusercontent.com/NebraskyTheWolf/GSync/main/manifest/_environment.json";

const GSYNC_REPO_BINARY_SIGNATURE = "https://raw.githubusercontent.com/NebraskyTheWolf/GSync/main/binary/_signature.json";
const GSYNC_REPO_BINARY_CHECKSUM = "https://raw.githubusercontent.com/NebraskyTheWolf/GSync/main/binary/_checksum.json";
const GSYNC_REPO_BINARY = "https://raw.githubusercontent.com/NebraskyTheWolf/GSync/main/binary/GHIDORAH.pawt";


const variableToCheck = [
    "TOKEN",
    "DISCORDID",
    "USER_ID",
    "SECRET",
    "SERVERTYPE",
    "XP_BOOST",
    "HTTP_HOST",
    "RANK_MULTIPLIER",
    "PUBLIC_KEY",
    "MONGODB",
    "DEBUG",
    "MOZAMBIQUE_KEY"
];

//////////// MODULES /////////////

const RCCheck = require('./modules/RevisionCheck');
const IRC = require('./modules/Information');

//////////// MODULES /////////////

global.logger = Logger;
global.syncConfig = config;
global.syncConst = constant;
global.GFetch = fetch;

module.exports.Initialization = function () {
    Logger.log('DEBUG', `Starting GSYNC...`);

    if (!fs.existsSync(runDir)) {
        Logger.log("INFO", "Creating GHIDORAH running directory.");
        if (fs.mkdirSync(runDir)
            && fs.mkdirSync(runDir + 'manifest')
            && fs.mkdirSync(runDir + 'binary')
            && fs.mkdirSync(runDir + 'cache')) {
            Logger.log('INFO', "All running directories has been created!");
        }
    } else {
        IRC.init();
    }

    Logger.log('DEBUG', `Checking revision...`);

    RCCheck.init(GSYNC_REPO_BINARY_CHECKSUM);
    RCCheck.init(GSYNC_REPO_BINARY_SIGNATURE);
    RCCheck.init(GSYNC_REPO_MANIFEST_DOWNLOAD);
    RCCheck.init(GSYNC_REPO_MANIFEST_VERSION);
    RCCheck.init(GSYNC_REPO_MANIFEST_ENV);

    this.PreInitialization();
}

module.exports.PreInitialization = function () {
    variableToCheck.forEach(result => {
        if (process.env[result] === undefined) {
            Logger.log('ERROR', `Aborting launch: ${result} is missing in the variables.`);
            process.exit(0x2F);
        }
    });
    this.PostInitialization();
}

module.exports.PostInitialization = function () {
    Logger.log('INFO', "Checking launch authorisation");

    const main = require('../core/index');
    main.start(); // START THE MAIN PROGRAM AFTER ALL THE CHECKS.
}

this.Initialization();