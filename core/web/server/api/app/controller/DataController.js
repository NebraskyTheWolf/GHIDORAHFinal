module.exports = {
    payload: function (req, res) {
        const data = req.body;
        const token = req.get('Authorisation');
        if (token) {
            client.Database.fetchApplication(token).then(result => {
                if (result.appEnabled) {
                    client.PayloadHandler.handle(client, result, data, callback => {
                        res.status(200).json({
                            status: true,
                            message: 'VALIDATED_AUTHENTICATION',

                            data: {
                                informations: {
                                    appName: result.appName,
                                    appDescriptions: result.appDescription
                                },
                                auth: {
                                    accessToken: result.auth.accessToken,
                                    refreshToken: result.auth.refreshToken,
                                    authenticated: true
                                },
                                callback: callback
                            }
                        });
                    });
                } else {
                    res.status(401).json({
                        status: false,
                        code: 421035,
                        error: 'APPLICATION_DISABLED',

                        data: {
                            auth: {
                                authenticated: false
                            }
                        }
                    });
                }
            }).catch(err => {
                res.status(403).json({
                    status: false,
                    code: 403254,
                    error: 'INVALID_PROVIDED_TOKEN',
                    message: 'Invalid token provided.',

                    data: {
                        auth: {
                            authenticated: false
                        }
                    }
                });
            });
        } else {
            res.status(403).json({
                status: false,
                code: 403102,
                error: 'UNAUTHORISED_TOKEN',

                data: {
                    auth: {
                        authenticated: false
                    }
                }
            });
        }
    },
    callback: function (req, res) {  },

    fetchStats: async function (req, res) {
        const messages = await client.Database.countMessagesInt();
    },

    fetchPing: async function (req, res) {
        const array = [];
        await client.Database.fetchPings().then(data => {
            if (array[i] === undefined) {
                array[i] = data.ms;
            } else {
                array[i].push(data.ms);
            }
            return res.status(200).json({
                status: true,
                data: array
            });
        }).catch(err => {
            return res.status(200).json({
                status: false,
                error: err,
                data: []
            });
        });
    }
}