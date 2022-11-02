/* eslint-disable @typescript-eslint/no-var-requires */
import { RESTPostAPIChatInputApplicationCommandsJSONBody, REST, Partials, Collection, GatewayIntentBits, Client, BaseInteraction, Routes } from "discord.js";
import fs from 'fs';
import { extendedClient, commandFile, extendedCommand } from './Typings/interfaces'
const config = require('./config.json');
const commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];
function createClient(): extendedClient{
	const clnt = new Client({ 
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.DirectMessages,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.DirectMessageReactions
		], 
		partials: [
			Partials.Channel
		]}) as extendedClient
	clnt.commands = new Collection();
	return(clnt);
}

const client: extendedClient = createClient();
const commandFiles: Array<string> = fs.readdirSync('./Commands').filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command: commandFile = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	if(!fs.existsSync("./Scenarios")) fs.mkdirSync("./Scenarios");
	// Slash command setup stuff
	const rest = new REST({ version: '9' }).setToken(config.token);
	if(!client.isReady()) return;

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

client.on('interactionCreate', async (interaction: BaseInteraction) => {
	if (interaction.user.bot) return;
	if (!interaction.isChatInputCommand()) return;
	
	const command: commandFile | undefined = client.commands.get(interaction.commandName);

	if (!command) return;

	console.log(`Received command "${interaction.commandName}" from ${interaction.user.tag}.`);

	command.execute(interaction as extendedCommand);
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
process.on('unhandledRejection', (e) => console.error(e));
// client.on("debug", (e) => console.info(e));

client.login(config.token);