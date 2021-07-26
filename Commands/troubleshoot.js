module.exports = {
	name: 'troubleshoot',
	description: 'Start troublehooting a problem in your Tin Can!',
	execute(message, args, client, config, exampleEmbed) {
		message.channel.send(exampleEmbed);
	},
};