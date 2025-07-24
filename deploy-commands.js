const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const Config = require('./config.js'); // { TOKEN, CLIENT_ID, GUILD_ID }

const commands = [];
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandFiles = readdirSync(join(foldersPath, folder)).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = join(foldersPath, folder, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.warn(`[WARMING] ${file} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST({ version: '10' }).setToken(Config.TOKEN);

(async () => {
    try {
        console.log('[📡] Slash commands loading...');

        await rest.put(
            Routes.applicationGuildCommands(Config.CLIENT_ID, Config.GUILD_ID),
            { body: commands }
        );

        console.log(`[✅] ${commands.length} Command loaded.`);
    } catch (error) {
        console.error('[❌] Slash commands could not be deployed:', error);
    }
})();
