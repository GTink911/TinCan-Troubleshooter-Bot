const { Command } = require('discord.js-commando');


	module.exports = {
	name: 'startgame',
	description: 'WIP Command - Start a game. Requires the Administrator permission',
	userPermissions: ['ADMINISTRATOR'],
	execute(message, args) {
		message.channel.send('It appears you have the Administrator permission. Is this true :?');
	},
};