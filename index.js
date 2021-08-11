// NOTE: This code is ripped from another bot of mine. As such there may be some old/irrelevant stuff, feel free to Pull Request this out.
// NOTE: Due to stupid reason in the name category you can't have capitals or it screws everything up

// TODO: Fix reload command, I don't think its working

const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Fully online.');
	client.user.setActivity("Online and ready to help you troubleshoot - !troubleshoot :)")
});

client.on('message', async message => {

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;

	await command.execute(message, args, client, config, Discord)
});

// If anyone can figure out how to get the below to send a message when it breaks, I'd appreciate it.
client.on("error", (e) => {
	console.error(e);
	return;
});

client.on("warn", (e) => {
	console.warn(e);
	return;
});
// client.on("debug", (e) => console.info(e));

client.login(config.token);