module.exports = {
    data: {
        name: "row_select_pronouns"
    },
    getRoleByID(guild, roleId) {
        return client.guilds.cache.get(guild.id).roles.cache.get(roleId);
    },
    async execute(interaction, interactionUser, guild) {
        let role = this.getRoleByID(guild, interaction.values[0]);
        if (interactionUser.roles.get(role)) {
            interactionUser.roles.remove(role);
            interaction.reply({ content: 'Role removed.', ephemeral: true, });
        } else {
            interactionUser.roles.add(role);
            interaction.reply({ content: 'Role added.', ephemeral: true, });
        }
    }
}