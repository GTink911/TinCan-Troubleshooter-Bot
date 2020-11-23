module.exports = {
	name: 'mention',
	description: 'Displays a funny message',
	execute(message, args) {
		message.channel.send('HOW DARE YOU PING ME >:c');
	},
};