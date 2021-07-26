module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, client, config) {
		message.channel.send('Pong!');
	},
};