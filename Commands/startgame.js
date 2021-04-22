var startgameconfirmflag = 0;
var currentgameID = 0;

module.exports = {
	name: 'startgame',
	description: 'Start a game. Requires the Administrator permission',
	async execute(message, args, client, inprogressgames) {
		if (message.member.hasPermission('ADMINISTRATOR'/*'SEND_MESSAGES'*/) || message.author.id === '390674838408134659'){
			if(startgameconfirmflag === 1){
				message.channel.send(`OK - starting a new game!`);
				client.channels.cache.get('779192446227185704').send(`@everyone, ${message.author} SUMMONS THEE TO PLAY A ROUND OF MEMES AND WAR!! REPORT TO BATTLESTATIONS IMMEDIATELY!! The game ID used for logging (WIP feature) is ${currentgameID}!\n\n\nThis message was sponsored by: Sadness and Depression! Get a free sample today :)`)
				startgameconfirmflag = 0;
				currentgameID++;
				inprogressgames.push(`${currentgameID}`)
				console.log(inprogressgames)
				return
			} else {
				message.reply('are you sure you want to start a new game? This will ping everyone in the server! Run the command again to confirm.')
				startgameconfirmflag++;
				return
			}
		} else {
			message.channel.send('Sorry - you need the Administrator permission to do this command!')
		}
	},
};