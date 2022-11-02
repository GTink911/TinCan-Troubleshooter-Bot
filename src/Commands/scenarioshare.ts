/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import { Attachment, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import https from 'https';
import { scenarioFile } from '../Typings/interfaces';
import { isScenarioFile } from '../Typings/typeguards';

module.exports = {
	aliases: ['list', 'download', 'upload', 'report', 'download'],
	data: new SlashCommandBuilder()
		.setName('scenarioshare')
		.setDescription('Share Tin Can scenarios with others!')
		.addSubcommand(subcommand =>
			subcommand.setName('list')
				.setDescription('List all stored scenarios.'))
		.addSubcommand(subcommand =>
			subcommand.setName('download')
				.setDescription('Download a scenario.')
				.addIntegerOption(option =>
					option.setName('id')
						.setDescription('The ID of the scenario to download.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('upload')
				.setDescription('Upload a scenario.')
				.addAttachmentOption(option =>
					option.setName('file')
						.setDescription('The file to upload.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName('report')
				.setDescription('Report a scenario.')
				.addIntegerOption(option =>
					option.setName('id')
						.setDescription('The ID of the scenario to report.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand.setName('delete')
				.setDescription('Delete a scenario.')
				.addIntegerOption(option =>
					option.setName('id')
						.setDescription('The ID of the scenario to delete.')
						.setRequired(true))),
	async execute(interaction: ChatInputCommandInteraction) {
		const scenarioFiles = fs.readdirSync('./Scenarios').filter(file => file.endsWith('.json'));
		const subCommand = interaction.options.getSubcommand();

		// Check if the user specified the list command
		if(subCommand === 'list') {
			// Basic embed
			const listScenarioEmbed = new EmbedBuilder()
				.setColor('#58b9ff')
				.setTitle('Here\'s a list of all scenarios I have:')
				.setAuthor({ name: 'Join our Discord!', iconURL: 'https://i.imgur.com/3Bvt2DV.png', url: 'https://discord.gg/VReSZmzCQz' })
				.setTimestamp()
				.setFooter({ text: 'Use /scenarioshare download [scenario ID] to download a scenario, or /scenarioshare upload to upload a scenario!' });

			// Check if there are no scenarios; if so return with a message
			if (scenarioFiles.length === 0) return interaction.reply({ content: 'No scenarios found. Start uploading!', ephemeral: true });
			
			// For each file in the scenarioFiles array, add a field to the embed with data
			for (let i = 0; i < scenarioFiles.length; i++) {
				const scenario = require(`../scenarios/${scenarioFiles[i]}`);
				const ID = i + 1;
				listScenarioEmbed.addFields({ name: `${scenario.ScenarioName}`, value: `Created: ${scenario.CreatedDate}.\nUploaded By: ${scenario.UploadedBy}\nID: ${ID}`, inline: true })
			}
			
			return interaction.reply( { embeds: [listScenarioEmbed], ephemeral: true } );
		}

		// Check if the user specified the download command
		if(subCommand === 'download') {
			// We can override this number | null since ID is required
			const scenarioID = interaction.options.getInteger('id') as number;

			// Check if the scenario ID is valid
			if (scenarioID > scenarioFiles.length || scenarioID < 1) return interaction.reply({ content: 'That scenario ID is invalid! Use /scenarioshare list to see a list of scenarios.', ephemeral: true });

			// Get the scenario file
			const fileToDownload = `${scenarioFiles[scenarioID - 1]}`;

			console.log(`New scenario downloaded: ${fileToDownload} by ${interaction.user.tag}`);
			return interaction.reply({ files: [`./Scenarios/${fileToDownload}`], ephemeral: true });
		}

		// Check if the user specified the upload command
		if(subCommand === 'upload') {
			// We can override this Attachment | null since file is required
			const uploadedFile = interaction.options.getAttachment('file') as Attachment;

			// Defer because the upload might take a while
			interaction.deferReply({ ephemeral: true });

			// Check that the file extension ends in .json
			if (!uploadedFile.name || !uploadedFile.name.endsWith('.json')) return interaction.reply({ content: 'Upload Failed - You need to upload a JSON file!', ephemeral: true });

			// Check the scenario is valid
			if(!isScenarioFile(uploadedFile)) return interaction.reply({ content: "This scenario is not valid!", ephemeral: true })

			// If the file already exists, don't overwrite it
			if (fs.existsSync(`./Scenarios/${uploadedFile.name}`)) return interaction.reply({ content: 'Upload Failed - That scenario already exists! If you own this scenario, you can delete it.', ephemeral: true });

			// TODO: Allow the user to overwrite scenarios IF they are the author
			// Get the scenario file from URL and save it to ./Scenarios
			const file = fs.createWriteStream(`./Scenarios/${uploadedFile.name}`);
			https.get(`${uploadedFile.url}`, function(response) {
				response.pipe(file);
			});

			// Waiting because going too fast results in the file being seen and saved as empty
			await new Promise(resolve => setTimeout(resolve, 2000));
			fs.readFile(`./scenarios/${uploadedFile.name}`, 'utf-8', function (err, data){
				const json: scenarioFile = JSON.parse(data);
				json.UploadedBy = interaction.user.tag
				fs.writeFile(`./scenarios/${uploadedFile.name}`, JSON.stringify(json, undefined, 1), function(err) {
					if (err) return console.log(err);
				});
			});

			console.log(`New scenario uploaded: ${uploadedFile.name} from ${interaction.user.tag}`);
			return interaction.reply({ content: 'Scenario uploaded! Use /scenarioshare list to see it.', ephemeral: true });
		}

		// Check if the user specified the report command
		if(subCommand === 'report') {
			// We can override this number | null since ID is required
			const scenarioID = interaction.options.getInteger('id') as number;
			if (!scenarioFiles[scenarioID - 1]) return interaction.reply({ content: 'That scenario file cannot be found.', ephemeral: true })

			// Get the scenario file
			const fileToReport = `${scenarioFiles[scenarioID - 1]}`;
			console.log(`${interaction.user.tag} reported scenario ${fileToReport} for inappropriate content.`);
			return interaction.reply({ content: 'Scenario successfully reported. Your username has been logged. Misuse of this command will result in being blacklisted.', ephemeral: true });
		}

		if (subCommand === 'delete') {
			// We can override this number | null since ID is required
			const scenarioID = interaction.options.getInteger('id') as number;
			if (!scenarioFiles[scenarioID - 1]) return interaction.reply({ content: 'That scenario file cannot be found.', ephemeral: true })
			const fileToReport = `${scenarioFiles[scenarioID - 1]}`;
			const file: scenarioFile = require(`../Scenarios/${fileToReport}`);
			if(interaction.user.tag === file.UploadedBy || !file.UploadedBy) {
				fs.unlink(`./Scenarios/${fileToReport}`, function (err) {
					if (err) return console.log(err);
					console.log(`Scenario deleted: ${fileToReport} by ${interaction.user.tag}`);
					return interaction.reply({ content: 'Scenario deleted.', ephemeral: true })
				});
			} else { interaction.reply({ content: 'You did not upload this file.', ephemeral: true }) }
			
		}
	},
};