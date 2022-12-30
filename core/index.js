const { Collection, Client, Intents } = require("discord.js");
const discordModals = require('discord-modals');

const mongoose = require('mongoose');
const events = require('events');
const config = require("../config/config.json");
const server = require('./web/kernel');

const redis = require('redis');
const redisClient = redis.createClient(config.RedisClient);
const ConsoleColors = require('./utils/ConsoleColor');
const Logger = require('./utils/Logger')
    .setPrefix("GHIDORAH");
const StringUtils = require('./utils/StringUtils');
const LXDUtils = require('./utils/LXDUtils');
const func = require('./utils/function');
const PayloadHandler = require('./utils/PayloadHandler');
const convertor = require('./utils/ImageHandler');
const Moderation = require('./utils/ModerationHelper');
const SecLoader = require('./utils/SecLoader');

const IsLoaded = false;
const IsDebug = process.env.DEBUG;

const { fingerprint } = require('key-fingerprint');
const prints = fingerprint(process.env.PUBLIC_KEY, { encoding: 'hex', algorithm: 'sha512' });
const revision = require('child_process').execSync('git rev-parse HEAD').toString().trim();
const MozambiqueAPI = require("mozambique-api-wrapper");
const mozambiqueClient = new MozambiqueAPI(process.env.MOZAMBIQUE_KEY, 5);
const fs = require('fs');
const util = require('util');
const logFile = fs.createWriteStream(__dirname + '/ghidorah.log', { flags: 'w' });
const logStdout = process.stdout;

module.exports.start = function () {
    const client = new Client({
        partials: ["MESSAGE", "USER", "REACTION"],
        disableMentions: "everyone",
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_WEBHOOKS,
            Intents.FLAGS.GUILD_INVITES,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        ],
        ws: { properties: { $browser: "Discord iOS" } }
    });

    discordModals(client);
    client.config = config;
    global.client = client;
    client.Database = require('./Database/MongoDB');

    client.consoleColors = ConsoleColors;
    client.logger = Logger;
    client.commands = new Collection();
    client.slcommands = new Collection();

    client.twitchCommands = new Collection();
    client.buttons = new Collection();
    client.modals = new Collection();
    client.redis = redisClient;

    client.tasks = new Collection();

    client.SecLoader = SecLoader;

    client.Modlog = require('./utils/ModLog');
    const Levels = require("discord-xp");
    Levels.setURL(process.env.MONGODB);
    client.levels = Levels;

    client.events = new events.EventEmitter();
    client.websocket = new events.EventEmitter();
    client.StringUtils = StringUtils;
    client.networks = new Collection();

    client.lxdNetwotk = LXDUtils;

    client.mainGuild = client.guilds.cache.get(process.env.DEFAULT_GUILD);
    client.func = func;
    client.IsLoaded = IsLoaded;
    client.IsDebug = IsDebug;

    client.cancellableTasks = new Collection();
    client.PayloadHandler = PayloadHandler;

    client.fingerprint = prints;
    client.Convertor = convertor;

    client.version = '3.5.5';
    client.revision = revision;

    client.moderationHelper = Moderation;
    client.ApexAPI = mozambiqueClient;

    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        client.logger.log('INFO', 'Connected to MongoDB');
    }).catch((err) => {
        client.logger.log('WARN', 'Unable to connect to MongoDB Database.');
    });

    require('./handlers/info')(client);
    require('./handlers/event')(client);
    require('./handlers/anticrash')(client);

    server.bootloader(process.env.SERVERTYPE, client);

    client.ws.on("INTERACTION_CREATE", async interaction => {
        if (!interaction.data.name) {
            await client.logger.log('CRITICAL', `Error occurred during interaction execution: 'interaction.data.name' can't be null.`);
            return;
        }

        let guild = await client.Database.fetchGuild(interaction.guild_id);
        if (guild.blacklisted) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Sorry but this server are blacklisted.",
                        flags: 64
                    }
                }
            });
            return;
        }

        if (!client.commands.has(interaction.data.name)) return;
        if (!client.IsLoaded) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Sorry but my code is not loaded. Please wait a few seconds.",
                        flags: 64
                    }
                }
            });
            return;
        }

        try {
            if (guild.config.interaction.enabled) {
                await client.commands.get(interaction.data.name).execute(interaction);
            } else {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "Sorry but the commands are disabled in this guild.",
                            flags: 64
                        },
                    },
                });
            }
        } catch (error) {
            client.logger.log('ERROR', `Error from command ${interaction.data.name} : ${error.message}`);
            client.logger.log('ERROR', `${error.stack}\n`);
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Sorry, error occured when running this command!",
                        flags: 64
                    },
                },
            });
        }
    });

    client.login(process.env.TOKEN);
}