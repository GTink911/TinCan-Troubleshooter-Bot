﻿var StarterResponsePlaintext = 'DEBUG'
var ProblemResponsePlaintext = 'DEBUG'
var ResponseToCheckAgainst = 'DEBUG'

module.exports = {
	name: 'troubleshoot',
	description: 'Start troublehooting a problem in your Tin Can!',
	execute(message, args, client, config, Discord) {

		const filter = (reaction, user) => {
			return ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱',].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		// Defining the embeds. If anyone can find a way to make this simpler/more efficient, it would be super helpful

		const StarterEmbed = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Looks like its time to play another game of... \n***Troubleshooting Mania!***')
			.setAuthor('Need help with the bot? Join our Discord!', 'https://i.imgur.com/3Bvt2DV.png', 'https://discord.gg/5fYBbRJDYS')
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

		const ProblemEmbed = new Discord.MessageEmbed()
			.setColor('#58b9ff')
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
			.setDescription('Claim your prize by telling us what happened on [the GitHub!](https://github.com/GTink911/TinCan-Troubleshooter-Bot/issues/new) :)')
			.setTimestamp()
			.setFooter('The details of this issue have automatically been logged. However, it would still be helpful if you submit a bug report.')

		const IssueIsImpossible = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('That issue should be impossible...')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot/issues/new')
			.setDescription('But if you\'ve managed to get it, we\'re probably wrong. Create a issue on [our GitHub](https://github.com/GTink911/TinCan-Troubleshooter-Bot/issues/new) to let us know!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const PowerSupply = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your power supply!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Check your power connector/battery for issues. If it\'s black or sparking, then you\'ll know that\'s the issue.')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const SwitchOrFuse = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your fuse!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Check your fuse for issues. If it\'s black, then it\'s busted and needs to be removed or repaired. This can also be the switch\'s fault, albeit very rarely. Try swapping it for another system\'s switch.')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const SupplyOrTransformer = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your power supply or transformer!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Check your power connector/battery for issues. It can also be the transformer\'s fault - if they\'re black or red hot, then it\'s trashed, and you\'ll need to repair it or take it out!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const Pump = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your pump!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Check your pump! If it is black(er than usual, you can also check in the repair station), then it\'s broken, and you\'ll need to repair it or swap it for another one!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

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
								YouBrokeTheBotFunct()
						}
                    }
				});
			});
		}

		function WhatIsProblem() {

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
			if (ProblemResponsePlaintext === 'DEBUG') YouBrokeTheBotFunct()
			ResponseToCheckAgainst = StarterResponsePlaintext + '|' + ProblemResponsePlaintext

			// From my understanding this switch statement does the job, but is slow (comparatively). Do any more experienced programmers know the best way to do this?

			// NOTE: If you don't see a condition here, I found it was impossible in my testing and removed it. These all flow to the default
			switch (ResponseToCheckAgainst) {
				case 'A|A':
					return message.channel.send(PowerSupply)
				case 'A|B':
					return message.channel.send(SwitchOrFuse)
				case 'A|D':
					return console.log('damaged processor, data connector')
				case 'B|A':
					return console.log('power connector, power transformer, fuse, switch')
				case 'B|D':
					return console.log('processor')
				case 'C|A':
					return message.channel.send(PowerSupply)
				case 'C|C':
					return console.log('data connector')
				case 'D|A':
					return message.channel.send(SupplyOrTransformer)
				case 'D|B':
					return message.channel.send(SwitchOrFuse)
				case 'D|C':
					return console.log('pump, filter, data connector')
				case 'E|A':
					return message.channel.send(SupplyOrTransformer)
				case 'E|B':
					return message.channel.send(SwitchOrFuse)
				case 'E|C':
					return message.channel.send(Pump)
				case 'F|A':
					return message.channel.send(SupplyOrTransformer)
				case 'F|B':
					return message.channel.send(SwitchOrFuse)
				case 'G|B':
					return console.log('fuse')
				case 'G|C':
					return console.log('transformer, power connector, battery')
				case 'H|A':
					return message.channel.send(SupplyOrTransformer)
				case 'H|B':
					return message.channel.send(SwitchOrFuse)
				case 'I|A':
					return message.channel.send(SupplyOrTransformer)
				case 'I|B':
					return message.channel.send(SwitchOrFuse)
				case 'I|C':
					return message.channel.send(Pump)
				case 'I|D':
					return console.log('data connector')
				case 'J|A':
					return message.channel.send(SupplyOrTransformer)
				case 'J|B':
					return message.channel.send(SwitchOrFuse)
				case 'J|C':
					return console.log('pump, filter, data connector')
				case 'K|A':
					return message.channel.send(SupplyOrTransformer)
				case 'K|B':
					return message.channel.send(SwitchOrFuse)
				case 'L|A':
					return message.channel.send(SupplyOrTransformer)
				case 'L|B':
					return message.channel.send(SwitchOrFuse)
				case 'L|C':
					return message.channel.send(Pump)
				default:
					return message.channel.send(IssueIsImpossible)
            }
        }

		async function YouBrokeTheBotFunct() {
			message.channel.send(YouBrokeTheBot)
			var DebugMessageToSend = ('A major error occurred. Available details have been logged below:\nStarterResponsePlaintext: ' + StarterResponsePlaintext, '\nProblemResponsePlaintext: ' + ProblemResponsePlaintext + '\nResponseToCheckAgainst: ' + ResponseToCheckAgainst + '\nAuthor: ' + message.author.id);

			// This logs the error to a private channel in the troubleshooting Discord
			try {
				client.channels.cache.get('826545941355560960').send(DebugMessageToSend)
			} catch (Exception) {
				await console.log('Couldn\'t send the message to the error channel. Sending here instead.')
				await console.error(DebugMessageToSend);
				await console.error(e)
            }
		}
	}
}