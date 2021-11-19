// NOTE: This code is ripped from another bot of mine. As such there may be some old/irrelevant stuff, feel free to Pull Request this out.

const fs = require('fs');
const { Client, Intents, Discord, Collection} = require('discord.js');
const config = require('./config.json');

const myIntents = new Intents();
myIntents.add(
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS);

const client = new Client({ intents: myIntents, partials: ["CHANNEL"] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Fully online.');
	client.user.setActivity("Online and ready to help you troubleshoot - !troubleshoot :)")
});

client.on('messageCreate', async message => {

	// KNOWN ISSUE: Bot will NOT convert command names to lowercase in order to match with below code. All "name" values in command files **must be in lowercase**. If anyone knows how to fix I'd appreciate it. -GTink911

	if (!message.content.startsWith(config.prefix)) return;
	if (message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)

	if (!command) return;

	await command.execute(message, args, client, config, Discord)
});

// TODO: fix

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
// client.on("debug", (e) => console.info(e));

client.login(config.token);