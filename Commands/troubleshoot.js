let StarterEmbedResponse = 'DEBUG'

module.exports = {
	name: 'troubleshoot',
	description: 'Start troublehooting a problem in your Tin Can!',
	execute(message, args, client, config, Discord) {

		// Defining the embeds. If anyone can find a way to make this simpler/more efficient, it would be super helpful

		const StarterEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Looks like its time to play another game of... \n***Troubleshooting Mania!***')
			.setAuthor('Check out my GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Thanks for playing! What system are you having troubles with, my lad/ladess?')
			.addFields(
				{ name: 'Main Generator', value: 'React with :regional_indicator_a:!', inline: true },
				{ name: 'Main Computer', value: 'React with :regional_indicator_b:!', inline: true },
				{ name: 'Rescue Beacon', value: 'React with :regional_indicator_c:!', inline: true },
				{ name: 'CO2 Scrubber', value: 'React with :regional_indicator_d:!', inline: true },
				{ name: 'CO2 to O2 Station', value: 'React with :regional_indicator_e:!', inline: true },
				{ name: 'Lighting Systems', value: 'React with :regional_indicator_f:!', inline: true },
				{ name: 'Battery Charger', value: 'React with :regional_indicator_g:!', inline: true },
				{ name: 'Gravity Generator', value: 'React with :regional_indicator_h:!', inline: true },
				{ name: 'O2 Generator', value: 'React with :regional_indicator_i:!', inline: true },
				{ name: 'Pressure Stabilizer', value: 'React with :regional_indicator_j:!', inline: true },
				{ name: 'Repair Station', value: 'React with :regional_indicator_k:!', inline: true },
				{ name: 'Temperature Manager', value: 'React with :regional_indicator_l:!', inline: true },
			)
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		// still need to find the failure states for this, TODO urgently

		const ProblemEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Got it - now tell me, what\'s your issue?')
			.setAuthor('Missing a problem? Let us know on the GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('What problem are you having with the system?')
			.addFields(
				{ name: 'The switch is on, but the system does not have power!', value: 'React with :regional_indicator_a:!', inline: true },
				{ name: 'The switch is off, and it disables itself immediately after clicked!', value: 'React with :regional_indicator_b:!', inline: true },
				{ name: 'The system has power, but the system is not functioning!', value: 'React with :regional_indicator_c:!', inline: true },
				{ name: 'The system has power, but is functioning incorrectly!', value: 'React with :regional_indicator_d:!', inline: true },
				{ name: 'CO2 to O2 Station', value: 'React with :regional_indicator_e:!', inline: true },
				{ name: 'Lighting Systems', value: 'React with :regional_indicator_f:!', inline: true },
				{ name: 'Battery Charger', value: 'React with :regional_indicator_g:!', inline: true },
				{ name: 'Gravity Generator', value: 'React with :regional_indicator_h:!', inline: true },
				{ name: 'O2 Generator', value: 'React with :regional_indicator_i:!', inline: true },
				{ name: 'Pressure Stabilizer', value: 'React with :regional_indicator_j:!', inline: true },
				{ name: 'Repair Station', value: 'React with :regional_indicator_k:!', inline: true },
				{ name: 'Temperature Manager', value: 'React with :regional_indicator_l:!', inline: true },
			)
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const YouBrokeTheBot = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Great job, you broke the bot!')
			.setAuthor('Well this isn\'t good...', '', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Claim your prize by telling us what happened on [the GitHub!](https://github.com/GTink911/TinCan-Troubleshooter-Bot) :)')
			.setTimestamp()
			.setFooter('The details of this issue have automatically been logged. However, it would still be helpful if you submit a bug report.')

		// Sending the starting embed

		StartTroubleshoot();

		function StartTroubleshoot() {
			message.channel.send(StarterEmbed).then(async sentMessage => {

				await sentMessage.channel.send('Unfortunately, I\'m not sure how to let you react before they\'re done without also breaking the reaction order. I\'m (probably) working on a fix but until then you\'ll just have to wait. Sorry!')
				await sentMessage.react('🇦')
				await sentMessage.react('🇧')
				await sentMessage.react('🇨')
				await sentMessage.react('🇩')
				await sentMessage.react('🇪')
				await sentMessage.react('🇫')
				await sentMessage.react('🇬')
				await sentMessage.react('🇭')
				await sentMessage.react('🇮')
				await sentMessage.react('🇯')
				await sentMessage.react('🇰')
				await sentMessage.react('🇱')

				const filter = (reaction, user) => {
					return ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱',].includes(reaction.emoji.name) && user.id === message.author.id;
				};

				const collector = sentMessage.createReactionCollector(filter, { max: 1, time: 30000 });

				collector.on('end', (collected, reason) => {
					if (reason === 'time') {
						sentMessage.channel.send('Uh oh- you timed out!')
					} else {
						const userReaction = collected.array()[0];

						const response = userReaction._emoji.name;

						// WARNING: HUGE IF/ELSE CHAIN INCOMING. EXPERIENCED PROGRAMMERS MAY HAVE THEIR EYES BLEED.

						if (response === '🇦') {
							StarterEmbedResponse = 'A'
							return WhatIsProblem();
						} else if (response === '🇧') {
							StarterEmbedResponse = 'B'
							return WhatIsProblem();
						} else if (response === '🇨') {
							StarterEmbedResponse = 'C'
							return WhatIsProblem();
						} else if (response === '🇩') {
							StarterEmbedResponse = 'D'
							return WhatIsProblem();
						} else if (response === '🇪') {
							StarterEmbedResponse = 'E'
							return WhatIsProblem();
						} else if (response === '🇫') {
							StarterEmbedResponse = 'F'
							return WhatIsProblem();
						} else if (response === '🇬') {
							StarterEmbedResponse = 'G'
							return WhatIsProblem();
						} else if (response === '🇭') {
							StarterEmbedResponse = 'H'
							return WhatIsProblem();
						} else if (response === '🇮') {
							StarterEmbedResponse = 'I'
							return WhatIsProblem();
						} else if (response === '🇯') {
							StarterEmbedResponse = 'J'
							return WhatIsProblem();
						} else if (response === '🇰') {
							StarterEmbedResponse = 'K'
							return WhatIsProblem();
						} else if (response === '🇱') {
							StarterEmbedResponse = 'L'
							return WhatIsProblem();
						} else YouBrokeTheBotFunct();
                    }
				});
			});
		}

		function WhatIsProblem() {
			console.log('StarterEmbedResponse: ' + StarterEmbedResponse);

			if (StarterEmbedResponse === 'DEBUG') YouBrokeTheBotFunct()

			message.channel.send(ProblemEmbed).then(async sentMessage => {
				await sentMessage.react('🇦')
				await sentMessage.react('🇧')
				await sentMessage.react('🇨')
				await sentMessage.react('🇩')
				await sentMessage.react('🇪')
				await sentMessage.react('🇫')
				await sentMessage.react('🇬')
				await sentMessage.react('🇭')
				await sentMessage.react('🇮')
				await sentMessage.react('🇯')
				await sentMessage.react('🇰')
				await sentMessage.react('🇱')
			});
		}

		function YouBrokeTheBotFunct() {
			message.channel.send(YouBrokeTheBot)
			console.error('A major error occurred. Available details have been logged below./nStarterEmbedResponse: ' + StarterEmbedResponse, '/nResponse: ' + Response, '/nArrayOfCollected: ' + collected.array(), '/nIf all three of the above do not match. something has gone terribly, terribly wrong.')
        }
	},
};