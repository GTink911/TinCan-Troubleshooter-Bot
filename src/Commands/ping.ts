import { SlashCommandBuilder } from 'discord.js';
import { extendedCommand } from '../Typings/interfaces';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong! Checks to make sure the bot is running.'),
	execute(interaction: extendedCommand) {
		interaction.reply({ content: 'Pong!', ephemeral: true});
	},
};