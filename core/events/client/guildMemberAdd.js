module.exports = async function (client, member) {
  const guild = await client.Database.fetchGuild(member.guild.id);
  const role = client.guilds.cache.get(guild.id).roles.cache.get(guild.config.autorole.unverified);

  await member.roles.add(role);
  await client.Database.fetchMember(member.user.id, guild.id);

  if (guild.welcomeChannel !== undefined) {
    client.guilds.cache.get(guild.id).channels.cache.get(guild.welcomeChannel).send({
      "components": [
        {
          "type": 1,
          "components": [
            {
              "style": 2,
              "label": `You get 500 coins for your first join.`,
              "custom_id": `row_0_button_0`,
              "disabled": true,
              "type": 2
            }
          ]
        }
      ],
      "embeds": [
        {
          "type": "rich",
          "title": `Welcome ${member.username} on the lounge.`,
          "description": `Don't forget to go in <#1052173986391400468> to start your verification.`,
          "color": 0xff0080,
          "thumbnail": {
            "url": `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.jpeg`,
            "height": 128,
            "width": 128
          }
        }
      ]
    });
  }

  const channel = client.guilds.cache.get(guild.id).channels.cache.get(guild.logging.moderation);
  const blacklist = await client.Database.isBlacklisted(member.user.id);
  if (blacklist !== null && blacklist.data.active) {
    await channel.send({
      embeds: [
        {
          type: "rich",
          title: `GHIDORAH - Blacklist`,
          description: `<@${blacklist.id}> joined when they are blacklisted for ${blacklist.data.reason} ( No moderation action has been taken manual moderation required. )`,
          color: 0x00FFFF
        }
      ],
      components: [
        {
          type: 1,
          components: [
            {
              style: 4,
              label: `This user is not allowed to verify.`,
              custom_id: `reqe`,
              disabled: true,
              type: 2
            }
          ]
        },
        {
          type: 1,
          components: [
            {
              style: 4,
              label: `Manual moderation required.`,
              custom_id: `mmr`,
              disabled: true,
              type: 2
            }
          ]
        }
      ],
      flags: 1 << 4 // URGENT MESSAGE FLAGS
    });
  }
};