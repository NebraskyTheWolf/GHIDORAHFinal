module.exports = async (client, guild) => {
	const guilds = await client.Database.fetchGuild(guild.id);
	if (guilds.blacklisted) {
		await client.logger.log('WARN', `Blacklisted server tried to invite the bot: ${guild.id}.`);
		await guild.leave();
	}

	guild.systemChannel.send({
		"components": [
			{
			  "type": 1,
			  "components": [
				{
				  "style": 5,
				  "label": `Start`,
				  "url": `https://dashboard.ghidorah.uk`,
				  "disabled": false,
				  "emoji": {
					"id": `806253748598734848`,
					"name": `BCatAmazedWow`,
					"animated": false
				  },
				  "type": 2
				},
				{
				  "style": 5,
				  "label": `Commands`,
				  "url": `https://dashboard.ghidorah.uk/help/commands`,
				  "disabled": false,
				  "emoji": {
					"id": `783810410997481512`,
					"name": `CatLurkHi`,
					"animated": false
				  },
				  "type": 2
				},
				{
				  "style": 5,
				  "label": `More`,
				  "url": `https://dashboard.ghidorah.uk/help/about`,
				  "disabled": false,
				  "emoji": {
					"id": `918804322677030973`,
					"name": `wolfconfused`,
					"animated": false
				  },
				  "type": 2
				},
				{
				  "style": 5,
				  "label": `Support`,
				  "url": `https://dashboard.ghidorah.uk/contactus`,
				  "disabled": false,
				  "emoji": {
					"id": `975726426294714418`,
					"name": `help`,
					"animated": false
				  },
				  "type": 2
				}
			  ]
			}
		  ],
		  "embeds": [
			{
			  "type": "rich",
			  "title": `GHIDORAH - Thanks for adding me!`,
			  "description": `Hello there I'm GHIDORAH!\nThanks for adding me on your server, there is a few step to finish your configuration.\n\nPlease click on the button \`Start\` to finish the configuration.`,
			  "color": 0xff7300
			}
		]
	});
};