// @ts-check
const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const https = require('https');
const { SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
	aliases: ['list', 'download', 'upload', 'report', 'download'],
	data: new SlashCommandBuilder()
		.setName('scenarioshare')
		.setDescription('Share Tin Can scenarios with others!')
		/*
		.addSubcommand(subcommand =>
			subcommand.setName('list')
				.setDescription('List all stored scenarios.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('download')
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
						.setRequired(true)))
		*/
		.addStringOption(option =>
            option.setName('command')
                .setDescription('The command to execute.')
                .setRequired(true)
				.addChoices({ name: 'list', value: 'list' })
				.addChoices({ name: 'download', value: 'download' })
				.addChoices({ name: 'upload', value: 'upload' })
				.addChoices({ name: 'report', value: 'report' })
				.addChoices({ name: 'delete', value: 'delete' }))
		.addIntegerOption(option =>
			option.setName('scenarioid')
				.setDescription('The scenario ID to act on, if any.')
				.setRequired(false))
		.addAttachmentOption(option =>
			option.setName('scenariofile')
				.setDescription('The scenario to upload, if any.')
				.setRequired(false)),
	async execute(interaction, args) {
		// Note: fs.readdirSync requires one dot.. I.E. current directory... but require() needs TWO dots for previous directory! The inconsistency is murdering me!
		const scenarioFiles = fs.readdirSync('./Scenarios').filter(file => file.endsWith('.json'));
		if (!args[0]) return interaction.reply({ content: 'Please provide a argument. Valid arguments: \'list\', \'download\', \'upload\', \'report\'.\nUsage: /scenarioshare [argument]', ephemeral: true });

		// Check if the user specified the list command
		if(args[0] === 'list') {
			// Basic embed
			const listScenarioEmbed = new MessageEmbed()
				.setColor('#58b9ff')
				.setTitle('Here\'s a list of all scenarios I have:')
				.setAuthor({ name: 'Join our Discord!', iconURL: 'https://i.imgur.com/3Bvt2DV.png', url: 'https://discord.gg/VReSZmzCQz' })
				.setTimestamp()
				.setFooter({ text: 'Use /scenarioshare download [scenario ID] to download a scenario, or /scenarioshare upload to upload a scenario!' });

			// Check if there are no scenarios; if so return with a message
			if (!scenarioFiles.length) return interaction.reply({ content: 'No scenarios found. Start uploading!', ephemeral: true });
			
			// For each file in the scenarioFiles array, add a field to the embed with data
			for (var i = 0; i < scenarioFiles.length; i++) {
				let scenario = require(`../scenarios/${scenarioFiles[i]}`);
				const ID = i + 1;
				listScenarioEmbed.addField(`${scenario.ScenarioName}`, `Created: ${scenario.CreatedDate}.\nUploaded By: ${scenario.UploadedBy}\nID: ${ID}`, true)
			}
			
			return interaction.reply( { embeds: [listScenarioEmbed], ephemeral: true } );
		}

		// Check if the user specified the download command
		if(args[0] === 'download') {
			// Check if the user specified a scenario ID
			if (!args[1] || isNaN(args[1])) return interaction.reply({ content: 'You need to specify a valid scenario ID! Use /scenarioshare list to see a list of scenarios.', ephemeral: true });
			
			// Check if the scenario ID is valid
			if (args[1] > scenarioFiles.length || args[1] < 1) return interaction.reply({ content: 'That scenario ID is invalid! Use /scenarioshare list to see a list of scenarios.', ephemeral: true });

			// Get the scenario file
			const fileToDownload = `${scenarioFiles[args[1] - 1]}`;

			// Send the file to the author's DMs
			if (interaction.channel.type != 'DM') interaction.reply({ content: 'Sent you a DM with the scenario!', ephemeral: true });
			return interaction.reply({ files: [`./Scenarios/${fileToDownload}`], ephemeral: true });
		}

		// Check if the user specified the upload command
		if(args[0] === 'upload') {
			// Check if the user uploaded a scenario
			if (!args[1]) return interaction.reply({ content: 'You need to upload a JSON file!', ephemeral: true })

			// Check that the file extension ends in .json
			if (!args[1].name.endsWith('.json')) return interaction.reply({ content: 'Upload Failed - You need to upload a JSON file!', ephemeral: true });

			// Get the scenario file from URL and save it to ./Scenarios

			// If the file already exists, don't overwrite it
			if (fs.existsSync(`./Scenarios/${args[1].name}`)) return interaction.reply({ content: 'Upload Failed - That scenario already exists! If you own this scenario, you can delete it.', ephemeral: true });

			// TODO: Allow the user to overwrite scenarios IF they are the author

			const file = fs.createWriteStream(`./Scenarios/${args[1].name}`);
			https.get(`${args[1].url}`, function(response) {
				response.pipe(file);
			});

			// Is there a better way to wait here?
			// Waiting because going to fast results in the file being seen and saved as empty
			setTimeout(function temp(){ temp1() }, 2000)
			function temp1() {
				fs.readFile(`./scenarios/${args[1].name}`, 'utf-8', function (err, data){
					let json = JSON.parse(data)
					json.UploadedBy = interaction.user.tag
					fs.writeFile(`./scenarios/${args[1].name}`, JSON.stringify(json, undefined, 1), function(err) {
						if (err) return console.log(err);
					});
				});
			}

			console.log(`New scenario uploaded: ${args[1].name} from ${interaction.user.tag}`);
			return interaction.reply({ content: 'Scenario uploaded! Use /scenarioshare list to see it.', ephemeral: true });
		}

		// Check if the user specified the report command
		if(args[0] === 'report') {
			// Check that the scenario is valid
			if (!args[1] || isNaN(args[1])) return interaction.reply({ content: 'Please specify a scenario to report.', ephemeral: true })
			if (!scenarioFiles[args[1] - 1]) return interaction.reply({ content: 'That scenario file cannot be found.', ephemeral: true })

			// Get the scenario file
			const fileToReport = `${scenarioFiles[args[1] - 1]}`;
			console.log(`${interaction.user.tag} reported scenario ${fileToReport} for inappropriate content.`);
		}

		if (args[0] === 'delete') {
			if (!args[1] || isNaN(args[1])) return interaction.reply({ content: 'Please specify a scenario to delete.', ephemeral: true })
			if (!scenarioFiles[args[1] - 1]) return interaction.reply({ content: 'That scenario file cannot be found.', ephemeral: true })
			const fileToReport = `${scenarioFiles[args[1] - 1]}`;
			let file = require(`../Scenarios/${fileToReport}`);

			if(interaction.user.tag === file.UploadedBy) {
				fs.unlink(`./Scenarios/${fileToReport}`, function (err) {
					if (err) return console.log(err);
					return interaction.reply({ content: 'Scenario deleted.', ephemeral: true })
				});
			} else { interaction.reply({ content: 'You did not upload this file.', ephemeral: true }) }
			
		}
	},
};