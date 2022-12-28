module.exports = {
    data: {
        name: "row_select_pronouns"
    },
    getRoleByID(guild, roleId) {
        return client.guilds.cache.get(guild.id).roles.cache.get(roleId);
    },
    async execute(interaction, interactionUser, guild) {
        for (value in interaction.values) {
            let role = this.getRoleByID(guild, value);
            if (interactionUser.roles.get(role))
                interactionUser.roles.remove(role);
            else 
                interactionUser.roles.add(role);
        }
    }
}