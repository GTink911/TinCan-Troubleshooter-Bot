// KNOWN ISSUE: Bot will NOT convert command names to lowercase. All "name" values in command files **must be in lowercase**. If anyone knows how to fix I'd appreciate it since that means we can format the Help command with uppercase. -GTink911

module.exports = {
	name: 'help',
	description: 'List all commands or info about a specific command.',
	execute(message) {

		const { MessageEmbed } = require('discord.js');

		const { commands } = message.client;
		let CommandsArray = Array.from(commands.keys());

		const HelpMessage = new MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Here\'s a list of all my commands:')
			.setAuthor('Join our Discord!', 'https://i.imgur.com/3Bvt2DV.png', 'https://discord.gg/VReSZmzCQz')
			.setTimestamp()
			.setFooter('Use ![command] to use a command!');

		for (var i = 0; i < CommandsArray.length; i++) {
			const command = commands.get(CommandsArray[i])
			if (command.hidden) continue; 
			HelpMessage.addField(`${CommandsArray[i]}`, `${command.description}`, false)
		}

		return message.author.send({ embeds: [HelpMessage] })
			.then(() => {
				if (message.channel.type === 'DM') return;
				message.channel.send('I\'ve sent you a DM with all my commands!');
			})
			.catch(error => {
				message.channel.send(HelpMessage)
			});
	},
};