// NOTE: This code is ripped from another bot of mine. As such there may be some old/irrelevant stuff, feel free to Pull Request this out.
// NOTE: Due to stupid reason in the name category you can't have capitals or it screws everything up

const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity("Online and ready to help you troubleshoot - !troubleshoot :)")
});

//everything here is just testing

const exampleEmbed = new Discord.MessageEmbed()
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

// end test

client.on('message', async message => {

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;

	await command.execute(message, args, client, config, exampleEmbed)
});

// If anyone can figure out how to get the below to send a message when it breaks, I'd appreciate it.
client.on("error", (e) => {
	console.error(e);
	return;
});

client.on("warn", (e) => console.warn(e));
// client.on("debug", (e) => console.info(e));

client.login(config.token);