/*
	Master TODO List:
	Finish specialized logging and edit WIP startgame message
	Group dev commands under devtoolkit, w/ emergency backup code in event locked out
	addvar and addconst commands

	Master Note List: Due to stupid reason in the name category you can't have capitals or it screws everything up
*/

const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
var vibemessagecounter = 0
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
const inprogressgames = [
];

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("Online and ready to play Memes and War!")
});

client.on('message', async message => {

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	var devtoolkitarg = args[0]
	var devtoolkitarg2 = args[1]
	var devtoolkitarg3 = args[2]
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;




	if (message.author.id === '773969763076538380') {
		if (vibemessagecounter === 10) {
			vibemessagecounter = 0
			message.reply(`fuck you`);
			onMessage(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3, command);
		} else {
			vibemessagecounter++
			onMessage(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3, command);
		}
	}

	if (message.content.includes('murica') && message.channel.id === ('783389789591437333')) {
		if (message.author.bot) return;
		message.channel.send(`https://giphy.com/gifs/freedom-murica-UGGGGjJUsvx84`)
		onMessage(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3, command);
	} else onMessage(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3, command);

	onMessage(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3, command);

});

async function onMessage(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3, command) {
	await command.execute(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3);
}
client.on("error", (e) => {
	console.error(e);
	if(message.author.id === '390674838408134659'){
		message.channel.send('Uh oh GT - I had a error! Diagnostics data has been outputted to console.');
		return;
	} else {
		message.channel.send('Oh no D:\n Looks like I had a error! Luckily I can keep functioning, but please dm GTink911#1237 about this!');
		return;
	};
});

client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

client.login(config.token);