const fs = require('fs');
const { Client, GatewayIntentBits, Collection, Partials, IntentsBitField } = require('discord.js');
const config = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes, InteractionType } = require('discord-api-types/v9');
const commands = [];
const myIntents = new IntentsBitField();
myIntents.add([
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.DirectMessageReactions
]);

const client = new Client({ intents: myIntents, partials: [Partials.Channel] });
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
	if (!interaction.type === InteractionType.ApplicationCommand) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	console.log(`Received command "${interaction.commandName}" from ${interaction.user.tag}.`);

	await command.execute(interaction);
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
process.on('unhandledRejection', (e) => console.error(e));
// client.on("debug", (e) => console.info(e));

client.login(config.token);