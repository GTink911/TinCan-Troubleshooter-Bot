const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong! Checks to make sure the bot is running.'),
	execute(interaction) {
		interaction.reply({ content: 'Pong!', ephemeral: true});
	},
};