const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

function loadSlashCommands(client) {
    client.commands = new Collection();

    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${foldersPath}/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`${foldersPath}/${folder}/${file}`);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[❌] Komut geçersiz: ${file}`);
            }
        }
    }
}

module.exports = { loadSlashCommands };
