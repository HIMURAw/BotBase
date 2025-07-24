module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({ content: 'Command not found.', flags: 64 });
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'error 😵', flags: 64 });
        }
    }
};
