import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Get details on everyone who helped out!'),
	async execute(interaction: ChatInputCommandInteraction) {
		const DefaultEmbed = new EmbedBuilder()
			.setColor('#58b9ff')
			.setTitle('Below is a list of everyone who helped out!')
			.setAuthor({ name: 'Want to help? Click here to go to the GitHub!', iconURL: 'https://i.imgur.com/3Bvt2DV.png', url: 'https://github.com/GTink911/TinCan-Troubleshooter-Bot' })
			.addFields(
				{ name: 'GTink911#1237', value: 'Creator of the bot and writer of horrible code. Hey there!', inline: false },
				{ name: 'The Tin Can Developers', value: 'For being awesome :D', inline: false },
				{ name: 'Mairieux#2289', value: 'Beta tester. Thanks for your help!', inline: false },
				{ name: 'icecloud12#8212', value: 'They fixed GT\'s horrible code. A truly incredible feat!', inline: false },
			)
			.setTimestamp()

		interaction.reply({ embeds: [DefaultEmbed], ephemeral: true });
	},
};