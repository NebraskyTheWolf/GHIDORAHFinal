module.exports = {
    data: {
        name: "row_roles"
    },
    async execute(interaction, interactionUser, guild) {
        interaction.reply({
            content: 'We\'re sorry, but the roles are currently disabled.',
            ephemeral: true
        });
    }
}