const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List all commands or info about a specific command.'),
	execute(message) {
		const { commands } = message.client;
		let CommandsArray = Array.from(commands.keys());

		const HelpMessage = new MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Here\'s a list of all my commands:')
			.setAuthor('Join our Discord!', 'https://i.imgur.com/3Bvt2DV.png', 'https://discord.gg/VReSZmzCQz')
			.setTimestamp()
			.setFooter('Use /[command] to use a command!');

		for (var i = 0; i < CommandsArray.length; i++) {
			const command = commands.get(CommandsArray[i])
			if (command.hidden) continue; 
			HelpMessage.addField(`${CommandsArray[i]}`, `${command.data.description}`, false)
		}

		return message.reply({ embeds: [HelpMessage], ephemeral: true });
	},
};