module.exports = {
	name: 'shutdown',
	description: 'Shuts down the bot. Owner only.',
	async execute(message) {
		if (message.author.id === '390674838408134659'){
			message.reply(`OK - shutting myself down!`)
			console.log('Hey - I\'m shutting down :3')
			return process.exit()
		} else {
			return message.channel.send('Why are you trying to shutdown the bot :/')
		}
	},
};