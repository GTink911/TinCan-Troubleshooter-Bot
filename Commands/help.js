const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List all commands.'),
	execute(interaction) {
		const { commands } = interaction.client;
		let CommandsArray = Array.from(commands.keys());

		const HelpMessage = new MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Here\'s a list of all my commands:')
			.setAuthor({ name: 'Join our Discord!', iconURL: 'https://i.imgur.com/3Bvt2DV.png', url: 'https://discord.gg/VReSZmzCQz' })
			.setTimestamp()
			.setFooter({ text: 'Use /[command] to use a command!' });

		for (var i = 0; i < CommandsArray.length; i++) {
			const command = commands.get(CommandsArray[i])
			if (command.hidden) continue; 
			HelpMessage.addField(`${CommandsArray[i]}`, `${command.data.description}`, false)
		}

		return interaction.reply({ embeds: [HelpMessage], ephemeral: true });
	},
};