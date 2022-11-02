import { SlashCommandBuilder, ChatInputCommandInteraction, Client, Collection } from "discord.js";

export interface commandFile {
	data: SlashCommandBuilder;
	/**
	 * The main code for this command.
	 * 
	 * @param interaction The interaction
	 */
	execute: (interaction: extendedCommand) => void;
}

export interface extendedClient extends Client<true> {
	commands: Collection<string, commandFile>;
}

export interface extendedCommand extends ChatInputCommandInteraction {
	client: extendedClient;
}

export interface scenarioFile {
	ScenarioName: string;
	UploadedBy: string;
	CreatedDate: string;
}

interface systemType {
	name: string;
	debugName: string;
	parts: Array<partsType>;
}

interface errorType {
	name: string;
	blackList: string[];
}

interface partsType {
	name: string;
	issues: Array<errorType>;
}

export interface defaultsTyping {
	color: string;
	tincan: { logo: string; }
	bot: { discord: string; }
	parts: Record<string, partsType>;
	system: Record<string, systemType>;
	errors: Record<string, errorType>;
	systemsList: Array<systemType>;
	partsList: Array<partsType>;
}