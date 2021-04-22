module.exports = {
	name: 'endgame',
	description: 'End a game. Requires the Administrator permission!',
	async execute(message, args, inprogressgames) {
		if (message.member.hasPermission('ADMINISTRATOR')){
				if (!args.length) {
			return message.channel.send(`You need to specify which game to delete ${message.author}!`);
			}
			if (inprogressgames.includes(1)){
			//if(inprogressgames.indexOf(args[0]) !== -1){
				message.channel.send('Placeholder success')
				//inprogressgames.remove(args[0]);
				//console.log(inprogressgames)
				return
			} else {
				message.reply('that game doesn\'t exist! Did you put in the wrong number?')
			}
		} else {
			message.channel.send('Sorry - you need the Administrator permission to do this command!')
		}
	},
};