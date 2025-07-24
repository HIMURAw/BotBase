const { client, GatewayIntentBits } = require('discord.js');
const config = require('./config.js');

const BOT = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
    ],
});







BOT.login(config.TOKEN).then(() => {
    console.log('Bot is online!');
});