import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { extendedCommand } from "../Typings/interfaces";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List all commands.'),
	execute(interaction: extendedCommand) {
		const HelpMessage = new EmbedBuilder()
			.setColor('#58b9ff')
			.setTitle('Here\'s a list of all my commands:')
			.setAuthor({ name: 'Join our Discord!', iconURL: 'https://i.imgur.com/3Bvt2DV.png', url: 'https://discord.gg/VReSZmzCQz' })
			.setTimestamp()
			.setFooter({ text: 'Use /[command] to use a command!' })

		for (const commandArr of interaction.client.commands) {
			HelpMessage.addFields({ name: commandArr[0], value: commandArr[1].data.description, inline: false });
		}

		return interaction.reply({ embeds: [HelpMessage], ephemeral: true });
	},
};