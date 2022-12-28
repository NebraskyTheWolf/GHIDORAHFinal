const {MessageEmbed, Collection} = require('discord.js');

module.exports.createEmbed = async function (data) {
    let embed = new MessageEmbed()
        .setTitle(data.title).setColor(data.color);
    
    if (data.description !== undefined)
        embed.setDescription(data.description);
    else if (data.author !== undefined)
        embed.setAuthor(data.author);
    else if (data.fields)
        for (field in data.fields)
            embed.addField(field.name, field.content, field.inline);
    else if (data.timestamp)
        embed.setTimestamp(data.timestamp);
    else if (data.footer)
        embed.setFooter(data.footer);
    return embed;
}

module.exports.sendMessage = function (interaction, content, flags = 1 << 6) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: content,
                flags: flags
            }
        }
    });
}