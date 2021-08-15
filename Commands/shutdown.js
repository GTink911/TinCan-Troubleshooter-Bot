module.exports = {
	name: 'shutdown',
	description: 'Shuts down the bot. Owner only.',
	async execute(message) {
		if (message.author.id === '390674838408134659'){
			await message.channel.send(`OK - shutting down!`)
			await console.log('Shutting down')
			await process.exit()
		} else {
			return message.channel.send('Why are you trying to shutdown the bot :/')
		}
	},
};