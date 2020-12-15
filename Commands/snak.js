const max = 10000
const min = 1

module.exports = {
	name: 'snak',
	description: 'Displays a wonderful picure of a candy bar',
	execute(message, args) {
		const randomgeneratednumber = [Math.floor(Math.random() * (max - min) + min)];
		if (randomgeneratednumber === 987) {
			message.channel.send('You found my secret message, I guess. Fun fact: there is a 1 in 10000 chance of getting this instead of the candy bar picture. I haven\'t made anything here yet, but maybe I will Someday(tm).')
		} else {
			message.channel.send('https://cdn.discordapp.com/attachments/779214584502288395/779227621794906182/Z.png');
		}
	},
};