module.exports = {
	name: 'credits',
	description: 'Get details on everyone who helped out!',
	async execute(message, args, client, config, Discord) {

		const DefaultEmbed = new Discord.MessageEmbed()
			.setColor('#5865F2')
			.setTitle('Below is a list of everyone who helped out!')
			.setAuthor('Want to help? Click here to go to the GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.addFields(
				{ name: 'GTink911#1237', value: 'Creator of the bot and writer of horrible code, you\'re currently reading their text. Hey there!', inline: false },
				{ name: 'The Tin Can Developers', value: 'For being awesome :D', inline: false },
			)
			.setTimestamp()

		message.channel.send(DefaultEmbed)
	},
};