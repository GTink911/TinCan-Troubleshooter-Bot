var StarterResponsePlaintext = 'DEBUG'


module.exports = {
	name: 'troubleshoot',
	description: 'Start troublehooting a problem in your Tin Can!',
	execute(message, args, client, config, Discord) {

		const filter = (reaction, user) => {
			return ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱',].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		// Defining the embeds. If anyone can find a way to make this simpler/more efficient, it would be super helpful

		const StarterEmbed = new Discord.MessageEmbed()
			.setColor('#5865F2')
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
			.setColor('#5865F2')
			.setTitle('Got it - now tell me, what\'s your issue?')
			.setAuthor('List incomplete? Let us know on the GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('What problem are you having with the system?')
			.addFields(
				{ name: 'The switch is on, but the system does not have power!', value: 'React with :regional_indicator_a:!', inline: false },
				{ name: 'The switch is off, and it disables itself immediately after clicked!', value: 'React with :regional_indicator_b:!', inline: false },
				{ name: 'The system has power, but the system is not functioning or data is replaced with boxes!', value: 'React with :regional_indicator_c:!', inline: false },
				{ name: 'The system has power, but is functioning incorrectly!', value: 'React with :regional_indicator_d:!', inline: false },
			)
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const YouBrokeTheBot = new Discord.MessageEmbed()
			.setTitle('Great job, you broke the bot!')
			.setAuthor('Well this isn\'t good...', '', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Claim your prize by telling us what happened on [the GitHub!](https://github.com/GTink911/TinCan-Troubleshooter-Bot) :)')
			.setTimestamp()
			.setFooter('The details of this issue have automatically been logged. However, it would still be helpful if you submit a bug report.')

		// Sending the starting embed

		StartTroubleshoot();

		function StartTroubleshoot() {
			message.channel.send(StarterEmbed).then(async sentMessage => {

				const ReactionCollector = sentMessage.createReactionCollector(filter, { max: 1, time: 30000 });

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

				ReactionCollector.on('end', (collected, reason) => {
					if (reason === 'time') {
						sentMessage.channel.send('Uh oh- you timed out!')
					} else {
						const userReaction = collected.array()[0];

						const response = userReaction._emoji.name;

						// Is it possible to always have this trigger the WhatIsProblem function, unless the default (error handling) case is triggered? Would cut down a lot of code

						switch (response) {
							case '🇦':
								StarterResponsePlaintext = 'A'
								return WhatIsProblem();
							case '🇧':
								StarterResponsePlaintext = 'B'
								return WhatIsProblem();
							case '🇨':
								StarterResponsePlaintext = 'C'
								return WhatIsProblem();
							case '🇩':
								StarterResponsePlaintext = 'D'
								return WhatIsProblem();
							case '🇪':
								StarterResponsePlaintext = 'E'
								return WhatIsProblem();
							case '🇫':
								StarterResponsePlaintext = 'F'
								return WhatIsProblem();
							case '🇬':
								StarterResponsePlaintext = 'G'
								return WhatIsProblem();
							case '🇭':
								StarterResponsePlaintext = 'H'
								return WhatIsProblem();
							case '🇮':
								StarterResponsePlaintext = 'I'
								return WhatIsProblem();
							case '🇯':
								StarterResponsePlaintext = 'J'
								return WhatIsProblem();
							case '🇰':
								StarterResponsePlaintext = 'K'
								return WhatIsProblem();
							case '🇱':
								StarterResponsePlaintext = 'L'
								return WhatIsProblem();
							default:
								message.channel.send(YouBrokeTheBotFunct)
						}
                    }
				});
			});
		}

		function WhatIsProblem() {
			console.log('StarterResponsePlaintext: ' + StarterResponsePlaintext);

			if (StarterResponsePlaintext === 'DEBUG') YouBrokeTheBotFunct()

			message.channel.send(ProblemEmbed).then(async sentMessage => {
				await sentMessage.react('🇦')
				await sentMessage.react('🇧')
				await sentMessage.react('🇨')
				await sentMessage.react('🇩')
				const ReactionCollector = sentMessage.createReactionCollector(filter, { max: 1, time: 30000 });

				ReactionCollector.on('end', (collected, reason) => {
					if (reason === 'time') {
						sentMessage.channel.send('Uh oh- you timed out!')
					} else {
						const userReaction = collected.array()[0];

						const response = userReaction._emoji.name;

						// Is it possible to always have this trigger the WhatIsProblem function, unless the default (error handling) case is triggered? Would cut down a lot of code

						switch (response) {
							case '🇦':
								ProblemResponsePlaintext = 'A'
								return FindProblem();
							case '🇧':
								ProblemResponsePlaintext = 'B'
								return FindProblem();
							case '🇨':
								ProblemResponsePlaintext = 'C'
								return FindProblem();
							case '🇩':
								ProblemResponsePlaintext = 'D'
								return FindProblem();
							default:
								YouBrokeTheBotFunct();
						}
					}
				});
			});
		}

		function FindProblem() {
			console.log('ProblemResponsePlaintext: ' + ProblemResponsePlaintext)

			// From my understanding this statement does the job, but is slow (comparatively). Do any more experienced programmers know the best way to do this?
			// Also, is it better performance-wise to eat the extra lines and add a break to the end of these?

			// TODO: move all impossibles into default
			// Remember to swap out power connector for power supply to prevent confusion
			// Forgot data connector testing, should check that later

			// NOTE: If you don't see a condition here, I found it was impossible in my testing and removed it
			switch (StarterResponsePlaintext + '|' +ProblemResponsePlaintext) {
				case 'A|A':
					console.log('power connector damaged')
				case 'A|B':
					console.log('damaged fuse, damaged switch')
				case 'A|C':
					console.log('impossible')
				case 'A|D':
					console.log('damaged processor')
				case 'B|A':
					console.log('power connector, power transformer, fuse, switch')
				case 'B|B':
					console.log('impossible')
				case 'B|C':
					console.log('')
				case 'B|D':
					console.log('processor')
				case 'C|A':
					console.log('')
				case 'C|B':
					console.log('')
				case 'C|C':
					console.log('')
				case 'C|D':
					console.log('')
				case 'D|A':
					console.log('transformer, power connector')
				case 'D|B':
					console.log('switch, fuse')
				case 'D|C':
					console.log('pump, filter')
				case 'D|D':
					console.log('impossible')
				case 'E|A':
					console.log('transformer, connector')
				case 'E|B':
					console.log('switch, fuse')
				case 'E|C':
					console.log('pump')
				case 'E|D':
					console.log('impossible')
				case 'F|A':
					console.log('transformer, power connector')
				case 'F|B':
					console.log('switch, fuse')
				case 'F|C':
					console.log('impossible')
				case 'F|D':
					console.log('impossible')
				case 'G|A':
					console.log('impossible')
				case 'G|B':
					console.log('fuse')
				case 'G|C':
					console.log('transformer, power connector, battery')
				case 'G|D':
					console.log('impossible')
				case 'H|A':
					console.log('power connector, transformer')
				case 'H|B':
					console.log('fuse, switch')
				case 'H|C':
					console.log('impossible')
				case 'H|D':
					console.log('impossible')
				case 'I|A':
					console.log('power connector, transformer')
				case 'I|B':
					console.log('switch, fuse')
				case 'I|C':
					console.log('pump')
				case 'I|D':
					console.log('impossible')
				case 'J|A':
					console.log('transformer, power connector')
				case 'J|B':
					console.log('switch, fuse')
				case 'J|C':
					console.log('pump, filter')
				case 'J|D':
					console.log('impossible')
				case 'K|A':
					console.log('')
				case 'K|B':
					console.log('')
				case 'K|C':
					console.log('')
				case 'K|D':
					console.log('')
				case 'L|A':
					console.log('')
				case 'L|B':
					console.log('')
				case 'L|C':
					console.log('')
				case 'L|D':
					console.log('')
				default:
					console.log('DEBUG: Default triggered.')
            }
        }

		function YouBrokeTheBotFunct() {
			message.channel.send(YouBrokeTheBot)
			console.error('A major error occurred. Available details have been logged below.');
			console.error('StarterResponsePlaintext: ' + StarterResponsePlaintext, '/nResponse: ' + Response, '/nArrayOfCollected: ' + collected.array(), '/nIf all three of the above do not match. something has gone terribly, terribly wrong.');
			console.error('ProblemResponsePlaintext: ' + ProblemResponsePlaintext);
			console.error('Author: ' + message.author.id);
		}
	}
}