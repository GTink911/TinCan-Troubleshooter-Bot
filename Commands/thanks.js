module.exports = {
	name: 'thanks',
	description: 'Thanks the bot (Hey- thats me!) for their service.',
	execute(message, args) {
		if(message.author.id === '390674838408134659'){
			message.channel.send('Why, my master is thanking me? I am happy my speech parsers are hearing this!');
		} else if(message.author.id === '622666674591498250'){
			message.channel.send('Why, thank you Mr. Baguette! It is a honor to help on your server :smile:');
		} else {
			message.channel.send('It is an honor to serve on this server. I am pleased you are happy!');
		}
	},
};