const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const https = require('https');

module.exports = {
	name: 'scenarioshare',
	description: 'Share Tin Can scenarios with others!',
	async execute(message, args) {
		// Note: fs.readdirSync requires one dot.. I.E. current directory... but require() needs TWO dots for previous directory! The inconsistency is murdering me!
		const scenarioFiles = fs.readdirSync('./Scenarios').filter(file => file.endsWith('.json'));

		if (!args[0]) return message.channel.send('Please provide a argument. Valid arguments: \'list\', \'download\', \'upload\', \'report\'.\nUsage: !scenarioshare [argument]');

		// Check if the user specified the list command
		if(args[0] === 'list') {
			// Basic embed
			const listScenarioEmbed = new MessageEmbed()
				.setColor('#58b9ff')
				.setTitle('Here\'s a list of all scenarios I have:')
				.setAuthor('Join our Discord!', 'https://i.imgur.com/3Bvt2DV.png', 'https://discord.gg/VReSZmzCQz')
				.setTimestamp()
				.setFooter('Use !scenarioshare download [scenario name] to download a scenario, or !scenarioshare upload to upload a scenario!');

			// Check if there are no scenarios; if so return with a message
			if (!scenarioFiles.length) return message.channel.send('No scenarios found. Start uploading!');
			
			// For each file in the scenarioFiles array, add a field to the embed with data
			for (var i = 0; i < scenarioFiles.length; i++) {
				const scenario = require(`../scenarios/${scenarioFiles[i]}`);
				listScenarioEmbed.addField(`${scenario.ScenarioName}`, `Created ${scenario.CreatedDate}`, true)
			}
			
			return message.channel.send( { embeds: [listScenarioEmbed] } );
		}

		// Check if the user specified the download command
		if(args[0] === 'download') {
			// Check if the user specified a scenario ID
			if (!args[1] || isNaN(args[1])) return message.channel.send('You need to specify a valid scenario ID! Use !scenarioshare list to see a list of scenarios.');
			
			// Check if the scenario ID is valid
			if (args[1] > scenarioFiles.length || args[1] < 1) return message.channel.send('That scenario ID is invalid! Use !scenarioshare list to see a list of scenarios.');

			// Get the scenario file
			const fileToDownload = `${scenarioFiles[args[1] - 1]}`;

			// Send the file to the author's DMs
			if (message.channel.type != 'DM') message.channel.send('Sent you a DM with the scenario!');
			return message.author.send({ files: [`./Scenarios/${fileToDownload}`] });
		}

		// Check if the user specified the upload command
		if(args[0] === 'upload') {
			// Check if the user uploaded a scenario
			if (!message.attachments.first()) return message.channel.send('You need to upload a JSON file!')

			// Check that the file extension ends in .json
			if (!message.attachments.first().name.endsWith('.json')) return message.channel.send('Upload Failed - You need to upload a JSON file!');

			// Get the scenario file from URL and save it to ./Scenarios

			// If the file already exists, don't overwrite it
			if (fs.existsSync(`./Scenarios/${message.attachments.first().name}`)) return message.channel.send('Upload Failed - That scenario already exists!');

			// TODO: Allow the user to overwrite scenarios IF they are the author

			const file = fs.createWriteStream(`./Scenarios/${message.attachments.first().name}`);
			https.get(`${message.attachments.first().url}`, function(response) {
				response.pipe(file);
			});

			console.log(`New scenario uploaded: ${message.attachments.first().name} from ${message.author.tag}`);
			return message.channel.send('Scenario uploaded! Use !scenarioshare to see it.');
		}

		// Check if the user specified the report command
		if(args[0] === 'report') {
			// Check that the scenario is valid
			if (!args[1] || isNaN(args[1])) return message.channel.send('Please specify a scenario to report.')
			if (!scenarioFiles[args[1] - 1]) return message.channel.send('That scenario file cannot be found.')

			// Get the scenario file
			const fileToReport = `${scenarioFiles[args[1] - 1]}`;

			message.channel.send('Successfully reported scenario for inappropriate content. Your username has been logged. Misuse of this command will result in you being blacklisted.');
			console.log(`${message.author.tag} reported scenario ${fileToReport} for inappropriate content.`);
		}
	},
};