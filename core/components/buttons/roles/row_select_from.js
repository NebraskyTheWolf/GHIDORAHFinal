module.exports = {
    data: {
        name: "row_select_from"
    },
    async execute(interaction, interactionUser, guild) {
        let role = client.guilds.cache.get(guild.id).roles.cache.get(interaction.values[0]);
        if (interactionUser.roles.get(role)) {
            interactionUser.roles.remove(role);
            interaction.reply({ content: 'Role removed.', ephemeral: true, });
        } else {
            interactionUser.roles.add(role);
            interaction.reply({ content: 'Role added.', ephemeral: true, });
        }
    }
}