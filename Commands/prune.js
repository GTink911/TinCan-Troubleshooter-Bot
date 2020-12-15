module.exports = {
	name: 'prune',
	aliases: ['purge', 'clear'],
	cooldown: 5,
	description: 'Removes the specified number of messages. Requires the Administrator permission. Limit of 99 messages.',
	execute(message, args) {
		if (message.member.hasPermission('MANAGE_MESSAGES')) {
			const pruneamount = parseInt(args[0]) + 1;

			if (isNaN(pruneamount)) {
				return message.reply('that doesn\'t seem to be a valid number.');
			} else if (pruneamount <= 1 || pruneamount > 100) {
				return message.reply('you need to input a number between 1 and 99.');
			}

			message.channel.bulkDelete(pruneamount, true).catch(err => {
				console.error(err);
				message.channel.send('there was an error trying to prune messages in this channel!');
				});
		} else {
			message.channel.send(`Uh oh, ${message.author}, looks like you don't have the permissions to do that!`)
		}
	},
};