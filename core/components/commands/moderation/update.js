module.exports = {
    name: "update",
    description: "Update a sanction reason",
    commandOptions: [
        {
            "type": 3,
            "name": "caseid",
            "description": "Set the Case ID",
            "required": true
        }
    ],
    async execute(interaction) {}
}