const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong! Checks to make sure the bot is running.'),
	execute(message) {
		message.reply({ content: 'Pong!', ephemeral: true});
	},
};