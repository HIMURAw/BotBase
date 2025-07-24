const config = require('./config.js');
require('./deploy-commands.js');

const { CustomClient } = require('./structures/CustomClient.js');

const Bot = new CustomClient();

Bot.start();