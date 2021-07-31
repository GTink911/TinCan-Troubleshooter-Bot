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

		const ProblemEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Got it - now tell me, whats your issue?')
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

		const YouBrokeTheBot = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Great job, you broke the bot!')
			.setAuthor('Well this isn\'t good...', '', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Claim your prize by telling us what happened on [the GitHub!](https://github.com/GTink911/TinCan-Troubleshooter-Bot) :)')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		// Sending the starting embeds

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

				collector.on('collect', (reaction, user) => {
					console.log(`DEBUG - REACTION COLLECTED`);
				});

				collector.on('end', (collected, reason) => {
					if (reason === 'time') {
						sentMessage.channel.send('Uh oh- you timed out!')
					} else {
						const userReaction = collected.array()[0];

						const response = userReaction._emoji.name;

						// WARNING: HUGE IF/ELSE CHAIN INCOMING. EXPERIENCED PROGRAMMERS MAY HAVE THEIR EYES BLEED.

						if (response === '🇦') {
							message.channel.send(YouBrokeTheBot);
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: A')
						} else if (response === '🇧') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: B')
						} else if (response === '🇨') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: C')
						} else if (response === '🇩') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: D')
						} else if (response === '🇪') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: E')
						} else if (response === '🇫') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: F')
						} else if (response === '🇬') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: G')
						} else if (response === '🇭') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: H')
						} else if (response === '🇮') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: I')
						} else if (response === '🇯') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: J')
						} else if (response === '🇰') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: K')
						} else if (response === '🇱') {
							message.channel.send('Thanks for testing, this is the end of the bot (For now!). Your response: L')
						}
                    }
				});
			});
		}
	},
};