const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Bot ping.'),

    async execute(interaction) {
        await interaction.reply(`🏓 Pong! ping: ${interaction.client.ws.ping}ms`);
    }
};
