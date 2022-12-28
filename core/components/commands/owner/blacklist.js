const Discord = require("discord.js");

module.exports = {
    name: "blacklist",
    description: "queue of wating users ( debug purpose )",
    commandOptions: [
        {
            "type": 3,
            "name": "userid",
            "description": "user id",
            "required": true
        },
        {
            "type": 3,
            "name": "reason",
            "description": "reason of the blacklist",
            "required": true
        },
        {
            "type": 3,
            "name": "action",
            "description": "execute handler",
            "required": true
        }
    ],
    async execute(interaction) {
        await client.Database.isDeveloper(interaction.member.user.id, async result => {
            if (result.isDev) {
                const targetId = interaction.data.options[0].value;
                const reason = interaction.data.options[1].value;
                const action = interaction.data.options[2].value;

                const blacklist = await client.Database.isBlacklisted(targetId);

                if (blacklist !== null && blacklist.data.active) {
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: 'User already blacklisted ID: ' + blacklist._id,
                                flags: 64
                            }
                        }
                    });
                    return;
                }

                let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor('ORANGE')
                    .setDescription(`GHIDORAH BLACKLIST`);

                await client.Database.createBlacklist(targetId, interaction.guild_id, {
                    targetId: targetId,
                    authorId: interaction.member.user.id,
                    reason: reason,
                    action: action
                }).then(results => {
                    embed.addField(`${targetId}`, `is now blacklisted.`, false);
                    embed.addField('Case ID: ', `${results._id}`, false);
                });

                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [embed],
                            ephemeral: true,
                            flags: 64
                        }
                    }
                });

                client.guilds.cache.get('1052173534299947008').channels.cache.get('1052174067312119808').send({
                    embeds: [
                        {
                            type: "rich",
                            title: `GHIDORAH - Blacklist`,
                            description: `Blacklist entry added.`,
                            color: 0xff8000,
                            fields: [
                                {
                                    name: `User`,
                                    value: `<@${targetId}>`,
                                    inline: true
                                },
                                {
                                    name: `Author`,
                                    value: `<@${interaction.member.user.id}>`,
                                    inline: true
                                },
                                {
                                    name: `Reason`,
                                    value: `${reason}`,
                                    inline: true
                                }
                            ]
                        }
                    ],
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    style: 3,
                                    label: `Blacklisted saved in the database`,
                                    custom_id: `row_0_button_0`,
                                    disabled: true,
                                    type: 2
                                }
                            ]
                        }
                    ],
                    flags: 1 << 6
                });
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Permission denied.")
                    .setDescription(`Only my developer can use this command...`);
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            embeds: [embed],
                            ephemeral: true,
                            flags: 64
                        }
                    }
                });
            }
        });
    }
}