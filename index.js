const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = [];
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
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	// Slash command setup stuff

	const rest = new REST({ version: '9' }).setToken(config.token);

	try {
		console.log('Started refreshing application (/) commands...');
		await rest.put(
			Routes.applicationCommands(client.user.id),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.\n');
	} catch (error) {
		console.error(error);
	}
	
	console.log(`Online and logged in as ${client.user.tag}!\n`);
	client.user.setActivity("Online and ready to help you troubleshoot - /troubleshoot :)")
});

client.on('interactionCreate', async interaction => {
	if (interaction.user.bot) return;
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	const args = [];
	if (interaction.options.getString('code')) args.push(interaction.options.getString('code'))
	if (interaction.options.getString('command')) args.push(interaction.options.getString('command'))
	if (interaction.options.getInteger('scenarioid')) args.push(interaction.options.getInteger('scenarioid'))
	if (interaction.options.getAttachment('scenariofile')) args.push(interaction.options.getAttachment('scenariofile'))
	// Probably a better way to do this but I just can't be bothered

	if (!command) return;

	console.log(`Received command "${interaction.commandName}" from ${interaction.user.tag}.`);

	await command.execute(interaction, args);
});

process.on("error", (e) => console.error(e));
process.on("warn", (e) => console.warn(e));
process.on('unhandledRejection', (e) => console.error(e));
// client.on("debug", (e) => console.info(e));

client.login(config.token);