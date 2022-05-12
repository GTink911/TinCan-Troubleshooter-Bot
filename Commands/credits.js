const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Get details on everyone who helped out!'),
	async execute(message) {
		const DefaultEmbed = new MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Below is a list of everyone who helped out!')
			.setAuthor('Want to help? Click here to go to the GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.addFields(
				{ name: 'GTink911#1237', value: 'Creator of the bot and writer of horrible code, you\'re currently reading their text. Hey there!', inline: false },
				{ name: 'The Tin Can Developers', value: 'For being awesome :D', inline: false },
				{ name: 'Mairieux#2289', value: 'Beta tester. Thanks for your help!', inline: false },
				{ name: 'icecloud12#8212', value: 'They fixed GT\'s horrible code. A truly incredible feat!', inline: false },
			)
			.setTimestamp()

		message.reply({ embeds: [DefaultEmbed], ephemeral: true });
	},
};