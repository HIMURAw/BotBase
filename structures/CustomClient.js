const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { loadSlashCommands } = require('../handlers/commandHandler');
const { loadEvents } = require('../handlers/eventHandler');
const config = require('../config.js');

class CustomClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
            ]
        });

        this.commands = new Collection();
        this.config = config;
    }

    async start() {
        loadSlashCommands(this);
        loadEvents(this);
        this.login(this.config.TOKEN);
    }
}

module.exports = { CustomClient };
