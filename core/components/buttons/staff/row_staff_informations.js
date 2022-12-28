module.exports = {
    data: {
        name: "row_staff_informations"
    },
    async execute(interaction, interactionUser, guild) {
        interaction.reply({
            "embeds": [
                {
                    "type": "rich",
                    "title": `Staff applications informations`,
                    "description": `Here is all the informations and requirements you need to apply.\n\nWe are looking for active moderators to moderate our community.\n\nRequirement:\n  > You must be 16 or older \n  > You must have a clean slate on the server.\n  > You know how to use the common moderation tools and avoiding conflict and be able to keep your calm.\n  > You must be level 40 or higher on the server.`,
                    "color": 0x12d97c
                }
            ],
            "ephemeral": true
        });
    }
}