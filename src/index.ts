/* eslint-disable @typescript-eslint/no-var-requires */
import { RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, REST, Partials, Collection, GatewayIntentBits, Client, BaseInteraction, ChatInputCommandInteraction } from "discord.js";
import fs from 'fs';

//const { Client } = require('discord.js');
const config = require('./config.json');
const { Routes } = require('discord-api-types/v9');
interface commandFile {
	data: SlashCommandBuilder;
	/**
	 * The main code for this command.
	 * 
	 * @param interaction The interaction
	 */
	execute: (interaction: ChatInputCommandInteraction) => void;
}
interface extendedClient extends Client {
	commands: Collection<string, commandFile>;
}
const commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];
const myIntents: Array<GatewayIntentBits> = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.DirectMessageReactions
]
const partials: Array<Partials> = [
	Partials.Channel
]
function createClient(): extendedClient{
	const clnt: extendedClient = new Client({ intents: myIntents, partials: partials }) as extendedClient
	clnt.commands = new Collection();
	return(clnt);
}

const client: extendedClient = createClient();
const commandFiles: Array<string> = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command: commandFile = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	// Slash command setup stuff
	const rest: REST = new REST({ version: '9' }).setToken(config.token);

	try {
		console.log('Started refreshing application (/) commands...');
		await rest.put(
			Routes.applicationCommands(client.user?.id),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.\n');
	} catch (error) {
		console.error(error);
	}
	
	console.log(`Online and logged in as ${client.user?.tag}!\n`);
	client.user?.setActivity("Online and ready to help you troubleshoot - /troubleshoot :)")
});

client.on('interactionCreate', async (interaction: BaseInteraction) => {
	if (interaction.user.bot) return;
	if (!interaction.isChatInputCommand()) return;
	
	const command: commandFile | undefined = client.commands.get(interaction.commandName);

	if (!command) return;

	console.log(`Received command "${interaction.commandName}" from ${interaction.user.tag}.`);

	command.execute(interaction);
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
process.on('unhandledRejection', (e) => console.error(e));
// client.on("debug", (e) => console.info(e));

client.login(config.token);