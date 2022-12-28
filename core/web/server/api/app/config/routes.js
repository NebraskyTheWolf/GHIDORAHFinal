module.exports = {
    'get /api/v1/user/:id': {'function': 'UserController.getUserById', protected: true},
    'get /api/v1/user/by-name/:username': {'function': 'UserController.getUserByName', protected: true},
    'get /api/v1/role/:id/:guild': {'function': 'UserController.getRoleById', protected: true},

    'get /api/v1/user/activate/:id': {'function': 'UserController.activateUser', protected: true},
    'get /api/v1/user/by-token/:token': {'function': 'UserController.getUserByToken', protected: true},
    'get /api/v1/users/online': {'function': 'UserController.getOnlineUsers', protected: true},

    'get /api/v1/users/messages': {'function': 'UserController.getTotalMessages', protected: true},
    'get /api/v1/users/messages/:guildId': {'function': 'UserController.getTotalMessagesById', protected: true},
    'get /api/v1/users/messages/by-user/:userId': {'function': 'UserController.getTotalMessagesByUser', protected: true},

    'get /api/v1/users/:id/:guild/sanctions': {'function': 'UserController.getUserSanction', protected: true},
    'post /api/v1/users/:id/:guild/:sanctionId/update': {'function': 'UserController.updateSanction', protected: true},
    'post /api/v1/users/:id/:guild/add': {'function': 'UserController.addSanction', protected: true},
    'get /api/v1/users/sanction/:id/:guild': {'function': 'UserController.getSanctionById', protected: true},

    'get /api/v1/users/isBlacklisted/:id': {'function': 'UserController.isBlacklisted', protected: true},
    'get /api/v1/users/blacklist/all': {'function': 'UserController.fetchAllBlacklists', protected: true},

    'get /api/v1/user/:id/stats/:guild': {'function': 'UserController.fetchUser', protected: true},
    'get /api/v1/users/staff': {'function': 'UserController.fetchStaff', protected: true},

    'get /api/v1/users/isDev/:userId': {'function': 'UserController.fetchDev', protected: true},
    'post /api/v1/users/developer/add': {'function': 'UserController.addDev', protected: true},

    'get /api/v1/user/:id/level/:guild': {'function': 'UserController.getUserLevel', protected: true},
    'get /api/v1/user/:id/presence/:guild': {'function': 'UserController.getUserPresence', protected: true},
    
    // manifest of the current planned event.
    'post /api/v1/events/:eventId/manifest' : {'function': 'FurconController.getManifest', protected: true},
    'post /api/v1/events/:eventId/border-check/:uuid' : {'function': 'FurconController.checkEntry', protected: true},
    'post /api/v1/events/:eventId/border-check/:uuid/manifest' : {'function': 'FurconController.checkEntryManifest', protected: true},

    'post /api/v1/user/verify/:id/:guild/create': {'function': 'VerifyController.create', protected: true},
    'get /api/v1/user/verify/:id/:guild/fetch': {'function': 'VerifyController.fetch', protected: true},
    'get /api/v1/user/verify/:guild/fetchAll': {'function': 'VerifyController.fetchAll', protected: true},
    'get /api/v1/user/verify/:username/:guild/fetchByName': {'function': 'VerifyController.fetchByName', protected: true},
    'get /api/v1/user/verify/:code/fetchByCode': {'function': 'VerifyController.fetchByCode', protected: true},
    'get /api/v1/user/verify/:id/update': {'function': 'VerifyController.update', protected: true},
    'post /api/v1/user/verify/:id/:guild/updateData': {'function': 'VerifyController.updateData', protected: true},

    // SERVERS
    'get /api/v1/servers': {'function': 'ServerController.fetchServers', protected: true},
    'get /api/v1/servers/by-id/:guildId': {'function': 'ServerController.getServerByID', protected: true},
    'get /api/v1/servers/by-id/:guildId/members': {'function': 'ServerController.getServerMembers', protected: true},
    'get /api/v1/servers/by-id/:guildId/config': {'function': 'ServerController.getServerConfig', protected: true},
    'get /api/v1/servers/by-id/:guildId/leaderboard': {'function': 'ServerController.fetchLeaderboard', protected: true},
    'get /api/v1/servers/by-id/:guildId/rules': {'function': 'ServerController.fetchRules', protected: true},
    'get /api/v1/servers/by-id/:guildId/verification/by-user/:userId': {'function': 'ServerController.checkVerify', protected: true},
    'get /api/v1/servers/by-id/:guildId/verification': {'function': 'ServerController.fetchAllVerify', protected: true},
    'get /api/v1/servers/by-id/:guildId/verification/counts': {'function': 'ServerController.countVerify', protected: true},
    'get /api/v1/user/by-id/:userid/:guildId': {'function': 'ServerController.getUsernameByID', protected: true},
    'get /api/v1/user/by-id/:userid/:guildId/level': {'function': 'ServerController.fetchLevel', protected: true},
    'post /api/v1/servers/by-id/:guildId/rules/create': {'function': 'ServerController.createRules', protected: true},
    'get /api/v1/server/by-owner/:ownerId': {'function': 'ServerController.fetchServerByOwner', protected: true},

    'post /api/v1/discord/interactions': {'function': 'DiscordController.discordInteractions', protected: true},

    // V8 DATA PUSH
    'get /api/v1/stats': {'function': 'DataController.fetchStats', protected: false},

    'get /api/v1/dashboard/logs/:serverId': {'function': 'DashboardController.fetchLogs', protected: true},
    'post /api/v1/dashboard/logs/:serverId/push': {'function': 'DashboardController.pushLogs', protected: true},

    // CONTAINS ALL DISCORD INFO + PERMISSION ACCESS LEVEL ( OWNER OR NO )
    'get /api/v1/dashboard/login/:serverId/:moderatorId/manifest': {'function': 'DashboardController.modInfo', protected: true},
    'post /api/v1/dashboard/login/connect': {'function': 'DashboardController.modLogin', protected: true},

    'get /api/v1/dashboard/activity/by-id/:serverId' : {'function': 'DashboardController.fetchActivity', protected: true},

}
