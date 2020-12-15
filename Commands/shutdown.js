var ShutdownRepeatedMarkerNumber = 0;

module.exports = {
	name: 'shutdown',
	description: 'Shuts down the bot. !!Owner Only!! (Don\'t even try!)',
	async execute(message, args) {
			if(message.author.id === '390674838408134659'){
				if(ShutdownRepeatedMarkerNumber === 1){ 
						message.reply(`OK - shutting myself down!`)
						console.log('Hey - I\'m shutting down :3')
						return process.exit()
				} else {
					message.reply('are you sure you want to shutdown the bot? WARNING: THIS WILL PURGE ALL STORED UNITS. Do the !shutdown command again to confirm.');
					ShutdownRepeatedMarkerNumber++;
					return console.log(`Ticked up ShutdownRepeatedMarkerNumber var (Is now ${ShutdownRepeatedMarkerNumber}) and sent reply message.`)
				}
		} else {
			message.channel.send('Why are you trying to shutdown MY bot >:c')
		}

	},
};