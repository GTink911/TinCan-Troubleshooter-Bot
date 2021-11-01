module.exports = {
	name: 'ping',
	description: 'Pong! Checks to make sure the bot is running.',
	execute(message) {
		message.channel.send('Pong!');
	},
};