var ShutdownRepeatedMarkerNumber = 0;

module.exports = {
	name: 'shutdown',
	description: 'Shuts down the bot. !!Owner Only!! (Don\'t even try!)',
	async execute(message, args) {
		if (message.author.id === '390674838408134659'){
			if(ShutdownRepeatedMarkerNumber === 1){ 
					message.reply(`OK - shutting myself down!`)
					console.log('Hey - I\'m shutting down :3')
					return process.exit()
			} else {
				message.reply('are you sure you want to shutdown the bot? WARNING: THIS WILL PURGE ALL STORED DATA. Do the !shutdown command again to confirm.');
				ShutdownRepeatedMarkerNumber++;
				return 
			}
		} else if(message.author.id === '773969763076538380'){
			message.channel.send('Oh dear god no, why does Vibe want to shut me down.........\n is this part of some nefarious plan to completely nuke my masters computer?\n its a good thing I deleted all that code about database systems..')
		} else {
			message.channel.send('Why are you trying to shutdown MY bot >:c')
		}

	},
};