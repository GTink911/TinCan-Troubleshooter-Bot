import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List all commands.'),
	execute(interaction: ChatInputCommandInteraction) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const commands = interaction.client.commands;
		const CommandsArray = Array.from(commands.keys());

		const HelpMessage = new EmbedBuilder()
		.setColor('#58b9ff')
		.setTitle('Here\'s a list of all my commands:')
		.setAuthor({ name: 'Join our Discord!', iconURL: 'https://i.imgur.com/3Bvt2DV.png', url: 'https://discord.gg/VReSZmzCQz' })
		.setTimestamp()
		.setFooter({ text: 'Use /[command] to use a command!' })

		for (let i = 0; i < CommandsArray.length; i++) {
			const command = commands.get(CommandsArray[i])
			if (command.hidden) continue;
			HelpMessage.addFields({ name: CommandsArray[i], value: command.data.description, inline: false });
		}

		return interaction.reply({ embeds: [HelpMessage], ephemeral: true });
	},
};