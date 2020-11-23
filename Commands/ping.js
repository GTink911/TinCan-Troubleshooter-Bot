module.exports = {
	name: 'ping',
	cooldown: 1,
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};