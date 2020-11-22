const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';


// Potential responses to Damage wheel
const damageresponses = [
    "Wow, that was close, but your crew managed to dodge the enemies attacks!",	
    "Despite your crew's best efforts, some light damage was taken!",
    "WARNING: FIRE DETECTED IN VEHICLE.",
    "WARNING: CONTACT WITH CREW LOST. CASUALTIES EXPECTED.",
];

// Potential responses to Torpedo wheel
const torpedoresponses = [
	"Despite your crew's best efforts, the torpedo hit and did light damage!",
	"Oh no - the torpedo hit and sensors are reporting light damage around the impact area!",
	"The torpedo hit and a fire has started!",
	"It was close, but with the data from your enhanced sensors the pilot of your vessel managed to dodge the torpedo!",
	"WARNING: CONTACT WITH VESSEL LOST. COMMUNICATIONS OFFLINE. CASUALTIES EXPECTED.",
];

// Potential responses to Depth Charges wheel
const depthchargeresponses = [
	"Looks like all that training paid off - The depth charges hit and cause light damage to the enemy vessel!",
	"With a boom, your depth charges explode, causing light damage to the enemy hull and systems!",
	"Looks like you hit the jackpot - your depth charges cause some fuel to explode, light fires throughout their ship!",
	"Despite your carefully guided depth charges, the enemies nimble ship managed to dodge the explosion. Don't worry - you'll get em next time!",
	"With a final explosion, the enemy ship cracks apart and quickly sinks to the bottom of the ocean - they won't be coming back from that.'",
];

// Potential ersponses to Fixing Fire wheel
const fixfireresponses = [
	"Quickly grabbing fire extinguishers, the crew luckily managed to quickly put out the fire.",
	"With their disaster training in mind, your crew coordinates to quickly put out the flames.",
	"The crew's fire extinguishers were not enough - the fire has spread and gotten a little worse!",
	"Despite the crew's efforts, sensors are reporting the fire has gotten a little worse rather than better!",
	"Oh no, the crew's fire extinguishers aren't enough and the fire has nearly spread to the fuel! (Much worse)",
	"With a final explosion, the flames catch the fuel line. The vessel is no more.",
	"WARNING: LARGE MUNITIONS EXPLOSION DETECTED AT VESSEL. CASUALTIES EXPECTED.",
];


var d = new Date();

client.once('ready', () => {
	console.log('Bot is online and ready to accept commands.');
	console.log('---')
});

client.on('message', message =>{
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

//	if(command === 'purge'){
//		function purge0
//	}

	if(command === 'ping'){
		message.channel.send('Pong!');
		console.log(`Bot ping command received; requested by ${message.author}`);
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'addunit'){
		message.channel.send('Error: While this is a valid command, it has not yet been implemented because GT is lazy AF');
		message.channel.send('(Also he is still learning how to code, but we will just ignore that in order to bully him)');
		console.log(`Request to add unit received, requested by ${message.author}`);
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'mention'){
		message.channel.send('HOW DARE YOU PING ME >:c');
		console.log(`Sent a mention command, requsted by ${message.author}`);
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'pog'){
		message.channel.send('https://cdn.discordapp.com/attachments/779186447969943564/779197436492906526/9k.png');
		console.log(`Sent a pog image, requested by ${message.author}`);
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'startgame' && message.member.permissions.has('ADMINISTRATOR')){
		message.channel.send('It appears you have the Administrator permission. Is this true :?');
		console.log(`Request to start a game received, requested by ${message.author}`);
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'baguette'){
		message.channel.send('https://cdn.discordapp.com/attachments/779186447969943564/779201107439255582/b_2.png');
		console.log(`Sent a baguette image, requested by ${message.author}`);
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'snak'){
		message.channel.send('https://cdn.discordapp.com/attachments/779214584502288395/779227621794906182/Z.png');
		console.log(`I love candy bars, and apparently someone else likes them too! (Sent a candy bar picture, requesetd by ${message.author})`);
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'help'){
		message.channel.send('List of all Valid Commands:\n!help - Send a help message containing all the commands!\n!ping - Ping the bot, usually as a test to see if it is running!\n!addunit - Add a unit. Requires a game to be in progress.\n!mention - No use really, just displays a funny message.\n!pog - No use really, just displays a funny image.\n!startgame - Starts a game. Requires you to have the Administrator role.\n!baguette - Displays a picture of a baguette.\n!snak - Displays a picture of a candy bar\n!wheel - Spin a wheel. Run without any arguments to see all options.\nSecret Commands: 1. Have fun.');
		console.log(`Help command sent, requested by ${message.author}`)
		console.log(d.toLocaleString());
		console.log('---')
	}

	if(command === 'intothefire'){
		message.channel.send('bWIzRGI4eHlFOA==')
		console.log(`ALERT: SECRET MESSAGE FOUND BY USER ${message.author}!!!`)
		console.log(d.toLocaleString());
	}

	if(command === 'wheel'){
	if (!args.length) {
		return message.channel.send(`You need to specify which wheel to spin ${message.author}! Valid wheels are:\nDamage\nTorpedo\ndepthcharges`);
		console.log(`Wheel options requested by ${message.author}`)
		console.log(d.toLocaleString());
		console.log('---')
	}

	else if (args[0] === 'damage') {
	   const damagerollresponse = damageresponses[Math.floor(Math.random() * damageresponses.length)];
	    message.channel.send(damagerollresponse);
		console.log(`Damage wheel has been spun at the request of ${message.author}`)
		console.log(d.toLocaleString());
		console.log('---');
	}

		else if (args[0] === 'torpedo') {
	   const torpedorollresponse = torpedoresponses[Math.floor(Math.random() * torpedoresponses.length)];
	    message.channel.send(torpedorollresponse);
		console.log(`Torpedo wheel has been spun at the request of ${message.author}`)
		console.log(d.toLocaleString());
		console.log('---');
	}

			else if (args[0] === 'depthcharge') {
	   const depthchargerollresponse = depthchargeresponses[Math.floor(Math.random() * depthchargeresponses.length)];
	    message.channel.send(depthchargerollresponse);
		console.log(`Depth Charge wheel has been spun at the request of ${message.author}`)
		console.log(d.toLocaleString());
		console.log('---');

	}


		else if (args[0] === 'fixfire') {
	const fixfirerollresponse = fixfireresponses[Math.floor(Math.random() * fixfireresponses.length)];
	message.channel.send(fixfirerollresponse);
	console.log(`Fix Fire wheel has been spun at the request of ${message.author}`)
	console.log(d.toLocaleString());
	console.log('---');
	}

}
	
});	


client.login('NzY1NjE3OTQ3Mjg4MjcyOTY3.X4XbRw.2MSR0XB5XvaOEKpiwz1syXxMN00')