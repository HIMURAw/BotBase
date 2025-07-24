const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const Config = require('./config.js');

const commands = [];
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandFiles = readdirSync(join(foldersPath, folder)).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(join(foldersPath, folder, file));
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        }
    }
}

const rest = new REST({ version: '10' }).setToken(Config.TOKEN);

(async () => {
    try {
        console.log('[📡] Slash komutlar yükleniyor...');

        await rest.put(
            Routes.applicationGuildCommands(Config.CLIENT_ID, Config.GUILD_ID),
            { body: commands },
        );

        console.log('[✅] Slash komutlar başarıyla yüklendi!');
    } catch (error) {
        console.error(error);
    }
})();
