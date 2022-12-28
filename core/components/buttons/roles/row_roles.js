module.exports = {
    data: {
        name: "row_roles"
    },
    async checkIfTrue(member, roleId) { },
    async execute(interaction, interactionUser, guild) {
        interaction.reply({
            "components": [
                {
                    "type": 1,
                    "components": [
                        {
                            "custom_id": `row_select_pronouns`,
                            "placeholder": `What are your pronouns?`,
                            "options": [
                                {
                                    "label": `Ask`,
                                    "value": `1052173889012248616`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `She/Her`,
                                    "value": `1052173891327508491`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `He/Him`,
                                    "value": `1052173890056622170`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `They/Them`,
                                    "value": `1052173892321546350`,
                                    "description": "",
                                    "default": false
                                },
                            ],
                            "min_values": 1,
                            "max_values": 3,
                            "type": 3
                        }
                    ]
                },
                {
                    "type": 1,
                    "components": [
                        {
                            "custom_id": `row_select_from`,
                            "placeholder": `Where are you from?`,
                            "options": [
                                {
                                    "label": `Asia`,
                                    "value": `1052173900517212170`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `North America`,
                                    "value": `1052173901536436304`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `South America`,
                                    "value": `1052173903042199572`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Europe`,
                                    "value": `1052173904594079764`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Africa`,
                                    "value": `1052173905843994654`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Australia`,
                                    "value": `1052173907148410890`,
                                    "description": "",
                                    "default": false
                                },
                            ],
                            "min_values": 1,
                            "max_values": 1,
                            "type": 3
                        }
                    ]
                },
                {
                    "type": 1,
                    "components": [
                        {
                            "custom_id": `row_select_species`,
                            "placeholder": `What are your species?`,
                            "options": [
                                {
                                    "label": `Fox`,
                                    "value": `1052173874755797022`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Wolf`,
                                    "value": `1052173875502399562`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Feline`,
                                    "value": `1052173882217480222`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Bird`,
                                    "value": `1052173884629205002`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Neko`,
                                    "value": `1057672862124736594`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `PrOwOtogen`,
                                    "value": `1052173876991377438`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Other species`,
                                    "value": `1052173883442208848`,
                                    "description": "",
                                    "default": false
                                }
                            ],
                            "min_values": 1,
                            "max_values": 5,
                            "type": 3
                        }
                    ]
                },
                {
                    "type": 1,
                    "components": [
                        {
                            "custom_id": `row_select_orientation`,
                            "placeholder": `What are your sexual orientation?`,
                            "options": [
                                {
                                    "label": `Gay`,
                                    "value": `1052173922604429373`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Bisexual`,
                                    "value": `1052173927343988828`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Pansexual`,
                                    "value": `1052173929910906920`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Asexual`,
                                    "value": `1052173928547762178`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Demisexual`,
                                    "value": `1052173930724597830`,
                                    "description": "",
                                    "default": false
                                },
                                {
                                    "label": `Heterosexual`,
                                    "value": `1052173925066485780`,
                                    "description": "",
                                    "default": false
                                },
                            ],
                            "min_values": 1,
                            "max_values": 3,
                            "type": 3
                        }
                    ]
                },
                {
                    "type": 1,
                    "components": [
                        {
                            "custom_id": `row_select_notification`,
                            "placeholder": `What do you want to be notified on?`,
                            "options": [
                                {
                                    "label": `Twitch`,
                                    "value": `1057670260351844352`,
                                    "description": `Receive the notification when Vakea is currently streaming.`,
                                    "emoji": {
                                        "id": `547516844114837534`,
                                        "name": `twitch`,
                                        "animated": false
                                    },
                                    "default": false
                                },
                                {
                                    "label": `Announcement`,
                                    "value": `1057670519660482610`,
                                    "description": `Receive the notification when we make a announcement on the server.`,
                                    "emoji": {
                                        "id": `547516844114837534`,
                                        "name": `twitch`,
                                        "animated": false
                                    },
                                    "default": false
                                },
                                {
                                    "label": `YouTube`,
                                    "value": `1057670526845321266`,
                                    "description": `Receive the notification when Vakea released a new video on YouTube.`,
                                    "emoji": {
                                        "id": `547516844114837534`,
                                        "name": `twitch`,
                                        "animated": false
                                    },
                                    "default": false
                                },
                                {
                                    "label": `Twitter`,
                                    "value": `1057670541974192168`,
                                    "description": `Receive the notification when Vakea released a new tweet.`,
                                    "emoji": {
                                        "id": `547516844114837534`,
                                        "name": `twitch`,
                                        "animated": false
                                    },
                                    "default": false
                                }
                            ],
                            "min_values": 1,
                            "max_values": 4,
                            "type": 3
                        }
                    ]
                }
            ],
            "embeds": [
                {
                    "type": "rich",
                    "title": `Roles Selections`,
                    "description": `Please select your roles in each category`,
                    "color": 0xff00ae
                }
            ],
            ephemeral: true
        });
    }
}