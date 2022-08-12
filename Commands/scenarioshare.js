// @ts-check
const fs = require('fs');
const { EmbedBuilder, SlashCommandBuilder, ChannelType } = require('discord.js');
const https = require('https');
const { InteractionResponseType } = require('discord-api-types/v9');
const { Channel } = require('diagnostics_channel');

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
	async execute(interaction) {
		// Note: fs.readdirSync requires one dot.. I.E. current directory... but require() needs TWO dots for previous directory! The inconsistency is murdering me!
		const scenarioFiles = fs.readdirSync('./Scenarios').filter(file => file.endsWith('.json'));

		// Check if the user specified the list command
		if(interaction.options.getString('command') === 'list') {
			// Basic embed
			const listScenarioEmbed = new EmbedBuilder()
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
				listScenarioEmbed.addFields({ name: `${scenario.ScenarioName}`, value: `Created: ${scenario.CreatedDate}.\nUploaded By: ${scenario.UploadedBy}\nID: ${ID}`, inline: true })
			}
			
			return interaction.reply( { embeds: [listScenarioEmbed], ephemeral: true } );
		}

		// Check if the user specified the download command
		if(interaction.options.getString('command') === 'download') {
			// Check if the user specified a scenario ID
			if (!interaction.options.getInteger('scenarioid') || isNaN(interaction.options.getInteger('scenarioid'))) return interaction.reply({ content: 'You need to specify a valid scenario ID! Use /scenarioshare list to see a list of scenarios.', ephemeral: true });
			
			// Check if the scenario ID is valid
			if (interaction.options.getInteger('scenarioid') > scenarioFiles.length || interaction.options.getInteger('scenarioid') < 1) return interaction.reply({ content: 'That scenario ID is invalid! Use /scenarioshare list to see a list of scenarios.', ephemeral: true });

			// Get the scenario file
			const fileToDownload = `${scenarioFiles[interaction.options.getInteger('scenarioid') - 1]}`;

			// Send the file to the author's DMs
			if (interaction.channel.type != ChannelType.DM) interaction.reply({ content: 'Sent you a DM with the scenario!', ephemeral: true });
			return interaction.reply({ files: [`./Scenarios/${fileToDownload}`], ephemeral: true });
		}

		// Check if the user specified the upload command
		if(interaction.options.getString('command') === 'upload') {
			// Check if the user uploaded a scenario
			if (!interaction.options.getAttachment('scenariofile')) return interaction.reply({ content: 'You need to upload a JSON file!', ephemeral: true })

			// Check that the file extension ends in .json
			if (!interaction.options.getAttachment('scenariofile').name.endsWith('.json')) return interaction.reply({ content: 'Upload Failed - You need to upload a JSON file!', ephemeral: true });

			// Get the scenario file from URL and save it to ./Scenarios

			// If the file already exists, don't overwrite it
			if (fs.existsSync(`./Scenarios/${interaction.options.getAttachment('scenariofile').name}`)) return interaction.reply({ content: 'Upload Failed - That scenario already exists! If you own this scenario, you can delete it.', ephemeral: true });

			// TODO: Allow the user to overwrite scenarios IF they are the author

			const file = fs.createWriteStream(`./Scenarios/${interaction.options.getAttachment('scenariofile').name}`);
			https.get(`${interaction.options.getAttachment('scenariofile').url}`, function(response) {
				response.pipe(file);
			});

			// Is there a better way to wait here?
			// Waiting because going to fast results in the file being seen and saved as empty
			setTimeout(function temp(){ temp1() }, 2000)
			function temp1() {
				fs.readFile(`./scenarios/${interaction.options.getAttachment('scenariofile').name}`, 'utf-8', function (err, data){
					let json = JSON.parse(data)
					json.UploadedBy = interaction.user.tag
					fs.writeFile(`./scenarios/${interaction.options.getAttachment('scenariofile').name}`, JSON.stringify(json, undefined, 1), function(err) {
						if (err) return console.log(err);
					});
				});
			}

			console.log(`New scenario uploaded: ${interaction.options.getAttachment('scenariofile').name} from ${interaction.user.tag}`);
			return interaction.reply({ content: 'Scenario uploaded! Use /scenarioshare list to see it.', ephemeral: true });
		}

		// Check if the user specified the report command
		if(interaction.options.getString('command') === 'report') {
			// Check that the scenario is valid
			if (!interaction.options.getInteger('scenarioid') || isNaN(interaction.options.getInteger('scenarioid'))) return interaction.reply({ content: 'Please specify a scenario to report.', ephemeral: true })
			if (!scenarioFiles[interaction.options.getInteger('scenarioid') - 1]) return interaction.reply({ content: 'That scenario file cannot be found.', ephemeral: true })

			// Get the scenario file
			const fileToReport = `${scenarioFiles[interaction.options.getInteger('scenarioid') - 1]}`;
			console.log(`${interaction.user.tag} reported scenario ${fileToReport} for inappropriate content.`);
			return interaction.reply({ content: 'Scenario successfully reported. Your username has been logged. Misuse of this command will result in being blacklisted.', ephemeral: true });
		}

		if (interaction.options.getString('command') === 'delete') {
			if (!interaction.options.getInteger('scenarioid') || isNaN(interaction.options.getInteger('scenarioid'))) return interaction.reply({ content: 'Please specify a scenario to delete.', ephemeral: true })
			if (!scenarioFiles[interaction.options.getInteger('scenarioid') - 1]) return interaction.reply({ content: 'That scenario file cannot be found.', ephemeral: true })
			const fileToReport = `${scenarioFiles[interaction.options.getInteger('scenarioid') - 1]}`;
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