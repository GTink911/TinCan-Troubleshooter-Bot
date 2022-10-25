import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong! Checks to make sure the bot is running.'),
	execute(interaction: ChatInputCommandInteraction) {
		interaction.reply({ content: 'Pong!', ephemeral: true});
	},
};