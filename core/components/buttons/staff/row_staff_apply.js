const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
    data: {
        name: "row_staff_apply"
    },
    async execute(interaction, interactionUser, guild) {
        const user = await client.levels.fetch(interactionUser.id, guild.id, true);

        if (user.level < 40) {
            interaction.reply({
                "embeds": [
                    {
                        "type": "rich",
                        "title": `Staff applications eligibility.`,
                        "description": `You are not eligible to apply, You need to be over level 40 to apply.`,
                        "color": 0xd9bb12
                    }
                ],
                "ephemeral": true
            });
        } else {
            const modal = new Modal()
                .setCustomId(`row_modal_id_staffApply_${interaction.user.id}_${guild.id}_apply`)
                .setTitle(`Staff applications.`)
                .addComponents(
                    new TextInputComponent()
                        .setCustomId(`row_id_staffApply_${interaction.user.id}_${guild.id}_textActionData_1`)
                        .setStyle("LONG")
                        .setLabel("Please talk about you.")
                        .setMinLength(0)
                        .setMaxLength(4000)
                        .setPlaceholder("Please be specific.")
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId(`row_id_staffApply_${interaction.user.id}_${guild.id}_textActionData_2`)
                        .setStyle("LONG")
                        .setLabel("HOW OLD ARE YOU")
                        .setMinLength(0)
                        .setMaxLength(4000)
                        .setPlaceholder("Do not round up, and do not give us your \"sona's\" age.")
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId(`row_id_staffApply_${interaction.user.id}_${guild.id}_textActionData_3`)
                        .setStyle("LONG")
                        .setLabel("Please be specific.")
                        .setMinLength(0)
                        .setMaxLength(4000)
                        .setPlaceholder("Why we should take you and not someone else?")
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId(`row_id_staffApply_${interaction.user.id}_${guild.id}_textActionData_4`)
                        .setStyle("LONG")
                        .setLabel("Do you know how to use the common tools?")
                        .setMinLength(0)
                        .setMaxLength(512)
                        .setPlaceholder("Please be specific don't lie! give us the server names.")
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId(`row_id_staffApply_${interaction.user.id}_${guild.id}_textActionData_5`)
                        .setStyle("LONG")
                        .setLabel("Do you have been sanctioned on this server?")
                        .setMinLength(0)
                        .setMaxLength(512)
                        .setPlaceholder("We will know")
                        .setRequired(true)
                );
            showModal(modal, {
                client: client,
                interaction: interaction
            });
        }
    }
}