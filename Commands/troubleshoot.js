var StarterResponsePlaintext = 'DEBUG'
var ProblemResponsePlaintext = 'DEBUG'
var ResponseToCheckAgainst = 'DEBUG'

var ReactionsString = "🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱";
var ReactionsPlainString = "ABCDEFGHIJKL"
//not really sure if this is worthit

//need extra step for the split function to work zzz
var ReactionsStringArr = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱"];
var ReactionsPlainStringArr = ReactionsPlainString.split("");

// some variables that are constant
var defaults = {
	'color' : '#58b9ff',
	'tincan' : {
		'logo' : 'https://i.imgur.com/3Bvt2DV.png',
	},
	'bot': {
		'discord': 'https://discord.gg/5fYBbRJDYS',
	},
	//partNames
	'parts':{
		'filter':{'name': 'Air Filter'},
		'alarms': {'name': 'Alarms'},
		'battery' : {'name':'Large Battery'},
		'bottle':{'name': 'bottle'},
		'buzzer': {'name':'Buzzer'},
		'crt': {'name':'CRT Monitor'},
		'data' : {'name':'Data Connector'},
		'fan' : {'name':'Fan'},
		'fuse' : {'name':'Fuse'},
		'power': {'name':'Power Connector'},
		'switch' : {'name':'Switch'},
		'trans' : {'name':'Power Transformer'},
		'proc' : {'name':'Processor'},
		'pump' : {'name':'Pump'},
	},
	'system' : {
		'generator': {'name':'Main Generator'},
		'computer': {'name':'Main Computer'},
		'beacon': {'name':'Rescue Beacon'},
		'scrubber': {'name':'CO2 Scrubber'},
		'recycler': {'name':'CO2 to O2 Station'},
		'light': {'name':'Lighting Systems'},
		'charger': {'name':'Fast Battery Charger'},
		'gravity': {'name':'Gravity Generator'},
		'oxygen': {'name':'O2 Generator'},
		'pressure': {'name':'Pressure Stabilizer'},
		'repair': {'name':'Repair Station'},
		'temperature': {'name':'Temperature Manager'}
	},
	'errors':{},
};
defaults.getSystemByName = function(systemName){
	var tempSystem = "";
	for (var i=0; i< this.systemsList.length; i++)
	{
		if(this.systemsList[i].name == systemName)
		{
			tempSystem = this.systemsList[i];
		}
	}
}
var systems = defaults.system;
defaults.systemsList = [
	systems.generator,
	systems.computer,
	systems.beacon,
	systems.scrubber,
	systems.recycler,
	systems.light,
	systems.charger,
	systems.gravity,
	systems.oxygen,
	systems.pressure,
	systems.repair,
	systems.temperature,
];
var parts = defaults.parts; //so we can shortcut this 

defaults.partsList = [
	parts.filter,
	parts.alarms,
	parts.battery,
	parts.bottle,
	parts.buzzer,
	parts.crt,
	parts.data,
	parts.fan,
	parts.fuse,
	parts.power,,
	parts.switch,
	parts.trans,
	parts.proc,
	parts.pump
];

systems.generator.parts = [
	parts.alarms,
	parts.buzzer,
	parts.crt,
	parts.data,
	parts.fuse,
	parts.power,
	parts.switch,
	parts.trans,
	parts.proc
];
systems.computer.parts=[
	parts.alarms,
	parts.crt,
	parts.switch,
	parts.buzzer,
	parts.data,
	parts.proc,
	parts.battery,
	parts.fuse,
	parts.power,
	parts.trans,
	parts.fan
];
systems.beacon.parts=[
	parts.power,
	parts.trans,
	parts.data,
	parts.crt,
	parts.battery
];
systems.scrubber.parts=[
	parts.alarms,
	parts.crt,
	parts.switch,
	parts.filter,
	parts.battery,
	parts.bottle,
	parts.buzzer,
	parts.data,
	parts.fuse,
	parts.power,
	parts.trans,
	parts.pump,
	parts.fan
];
systems.recycler.parts = [
	parts.bottle,
	parts.switch,
	parts.battery,
	parts.fuse,
	parts.trans,
	parts.pump,
];
systems.light.parts = [
	parts.switch,
	parts.battery,
	parts.fuse,
	parts.trans
];
systems.charger.parts = [
	parts.switch,
	parts.power,
	parts.fuse,
	parts.trans
];
systems.gravity.parts = [
	parts.alarms,
	parts.battery,
	parts.buzzer,
	parts.crt,
	parts.data,
	parts.fuse,
	parts.power,
	parts.switch,
	parts.trans,
	parts.processor
];
systems.oxygen.parts = [
	parts.alarms,
	parts.crt,
	parts.switch,
	parts.battery,
	parts.bottle,
	parts.buzzer,
	parts.data,
	parts.fuse,
	parts.power,
	parts.trans,
	parts.pump,
	parts.fan
];
systems.pressure.parts = [
	parts.alarms,
	parts.crt,
	parts.switch,
	parts.filter,
	parts.battery,
	parts.bottle,
	parts.buzzer,
	parts.data,
	parts.fuse,
	parts.power,
	parts.trans,
	parts.pump,
	parts.fan
	
];
systems.repair.parts = [
	parts.alarms,
	parts.crt,
	parts.switch,
	parts.battery,
	parts.buzzer,
	parts.data,
	parts.fuse,
	parts.power,
	parts.trans,
	parts.fan
];
systems.temperature.parts = [
	parts.alarms,
	parts.crt,
	parts.switch,
	parts.battery,
	parts.bottle.ln,
	parts.buzzer,
	parts.data,
	parts.fuse,
	parts.power,
	parts.trans,
	parts.pump
];
var errors = defaults.errors;
//initialize default errors
function GetBlackList(systemsList,except,whiteList=false){
	var tempArr=[];
	for(var i = 0; i<systemsList.length; i++)
	{
		if(!whiteList)
		{
			if((except.indexOf(systemsList[i].name)!= -1) )
			{
				tempArr.push(systemsList[i].name);
			}

		}
		else if (whiteList)
		{
			if(except.indexOf(systemsList[i].name)== -1)
			{
				tempArr.push(systemsList[i].name);
			}
		}	

	}
	return tempArr;
};



errors.production = {'name':'production','blackList':GetBlackList(
	defaults.systemsList,
	[
		systems.computer.name,
		systems.beacon.name,
		systems.light.name,
		systems.repair.name
	]
)};
errors.noHiss = {'name':'noHiss','blackList':[]};
errors.retriggering = {'name':'retriggering','blackList':[]};
errors.buzzerNoise = {'name':'buzzerNoise','blackList':[]};
errors.flickering = {'name':'flickering','blackList':[systems.repair.name, systems.beacon.name]};
errors.nonsenseData = {'name':'nonsenseData','blackList':[]};
errors.lowPower = {'name':'lowPower','blackList':[]};
errors.blow = {'name':'blow','blackList':[]};
errors.noPower = {'name':'noPower','blackList':[]};
errors.trigger = {'name':'trigger','blackList':[]};
errors.red = {'name':'red','blackList':[]};
errors.highPower = {'name':'highPower','blackList':GetBlackList(defaults.systemsList,[systems.generator.name],true)};
errors.highGrav = {'name':'highGrav','blackList':GetBlackList(defaults.systemsList,[systems.gravity.name],true)};

//initialize part issues here
parts.filter.issues= [errors.production, errors.noHiss];
parts.alarms.issues= [errors.retriggering];
parts.battery.issues=[];
parts.bottle.issues= [errors.production];
parts.buzzer.issues= [errors.buzzerNoise];
parts.crt.issues = [errors.flickering];
parts.data.issues = [errors.production,errors.nonsenseData];
parts.fan.issues = [errors.lowPower];
parts.fuse.issues = [errors.blow];
parts.power.issues = [errors.noPower,errors.lowPower, errors.production];
parts.switch.issues=[errors.trigger];
parts.trans.issues = [errors.red,errors.noPower,errors.highPower];
parts.proc.issues= [errors.highGrav,errors.highPower];
parts.pump.issues = [errors.production];


//add systems parts here
module.exports = {
	name: 'troubleshoot',
	description: 'Start troublehooting a problem in your Tin Can!',
	execute(message, args, client, config, Discord) {

		class DCME{
			constructor()
			{
				this.color = defaults.color;
				this.title = "";
				this.author= [];
				this.desc="";
				this.fields=[];
				this.footer=[];
				this.defaultColor = true;
				this.defaultFields = true;
				this.fieldsInline = false;
			}
			create(){
				var ret = new Discord.MessageEmbed();
				if (this.color !== "")
				{
					ret.setColor(this.color);
				}
				if (this.title !== "")
				{
					ret.setTitle(this.title);
				}
				if (this.author.length !== 0)
				{
					ret.setAuthor(this.author[0],this.author[1],this.author[2]);
				}
				if ( this.desc !== "") 
				{
					ret.setDescription = this.desc;
				}
				if(!this.defaultFields)
				{
					var val_i = "'React with :regional_indicator_";

					for(var i=0; i< this.fields.length; i++)
					{
						//console.log({name:this.fields[i].name, value:this.fields[i].value,inline:this.fieldsInline});
						ret.addField(this.fields[i], (val_i+(ReactionsPlainStringArr[i].toLocaleLowerCase())+":!"), this.fieldsInline);
					}
				}
				if ( this.fields.length >= 1)
				{
					//do some looping logic here
				}
				ret.setTimestamp();
				if ( this.footer.length >= 1)
				{
					ret.setFooter(this.footer[0], this.footer[1]);
				}
				return ret;
			}
			setColor(color)
			{
				this.color = color;
				this.defaultColor = false;
			}
			setFields(fields,inline=false){
				this.fields = fields;
				this.defaultFields = false;
				this.fieldsInline = inline
			}
		}
		

		const filter = (reaction, user) => {
			return ReactionsStringArr.includes(reaction.emoji.name) && user.id === message.author.id;
		};

		// Defining the embeds. If anyone can find a way to make this simpler/more efficient, it would be super helpful


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

		const DataConnector = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your data connector!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Check your data connector - if the wire is black, then you\'ve found the culprit!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const PumpFilterDataConnector = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your pump, filter, or data connector!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('If any of them are blackened, then you\'ll know that\'s your issue! To fix it, you\'ll need to swap it out for another or throw it in the repair station!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const PowerSupplyPowerTransformerFuseSwitch = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your - this is a long one - power supply (connector/battery), transformer, fuse, or switch!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('If one of them is black, you\'ll know that\'s the culprit. To fix it, you\'ll need to swap it out for another or throw it in the repair station!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const Fuse = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your fuse!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('Check your fuse! If it\'s black in contrast to it\'s usually white-grey color, you\'ve found the problem. Pull it out, and optionally repair it, to solve the problem!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const Processor = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your processor!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('A damaged processor will cause the system to start acting up! Repair it, or take it out (but risk causing more serious damage!)')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		const ProcessorDataConnector = new Discord.MessageEmbed()
			.setColor('#58b9ff')
			.setTitle('Check your processor or data connector!')
			.setAuthor('Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setDescription('If either of them are blackened/broken, then you\'ll know that\'s your issue! To fix it, you\'ll need to swap it out for another or throw it in the repair station!')
			.setTimestamp()
			.setFooter('Remember, you can pause your game while using the bot!', 'https://i.imgur.com/3Bvt2DV.png');

		// Sending the starting embed

		StartTroubleshoot();

		function StartTroubleshoot() {
			//create starterEmbed here
			let tempStarterEmbed = new DCME();
			tempStarterEmbed.title="Looks like its time to play another game of... \n***Troubleshooting Mania!***";
			tempStarterEmbed.author=["Need help with the bot? Join our Discord!", defaults.tincan.logo, defaults.bot.discord];
			tempStarterEmbed.desc = "Thanks for playing! What system are you having troubles with, my lad/ladess?";

			var tempfields=[];
			
			for(var i=0; i<defaults.systemsList.length;i++)
			{
				tempfields.push(defaults.systemsList[i].name);
			}
			
			tempStarterEmbed.setFields(tempfields,true);
			//
			message.channel.send(
				
				tempStarterEmbed.create()
				).then(async sentMessage => {

				const ReactionCollector = sentMessage.createReactionCollector(filter, { max: 1, time: 30000 });
				ReactionCollector.on('end', (collected, reason) => {
					if (reason === 'time') {
						sentMessage.channel.send('Uh oh- you timed out!')
					}else {

						const userReaction = collected.array()[0];
						const response = userReaction._emoji.name;
						var ReactionsStringResponseIndex = ReactionsStringArr.indexOf(response) 
						if ( ReactionsStringResponseIndex != -1)
						{
							StarterResponsePlaintext = ReactionsPlainString[ReactionsStringResponseIndex];
							return WhatIsProblem(ReactionsStringResponseIndex);
						}	
						else{
							YouBrokeTheBotFunct()//
						}
						

					}
				});
			
				for( var i=0 ; i < defaults.systemsList.length; i++)
				{
					
					await sentMessage.react(ReactionsStringArr[i])
				}
				
			
			});

		}
		function CreateFieldsForSystems(systemIndex)
		{
			var issuesArray = [];
			var partsArray = [];
			//get the system parts
			var tempSystem = defaults.systemsList[systemIndex]
			var tempSystemParts = tempSystem.parts;
			var allParts = defaults.partsList;
			
			for( var i=0; i< allParts.length; i++) //using defaults.parts instead so its orderly
			{
				var partIndex = tempSystemParts.indexOf(allParts[i]);
				if( partIndex!= -1)
				{
					var tempPart = allParts[i];
				
					for ( var j=0; j<tempPart.issues.length; j++)
					{
						var currentIssue = tempPart.issues[j];
						
						//check if not blacklisted
						if(currentIssue.blackList.indexOf(tempSystem.name) == -1)
						{
							if(issuesArray.indexOf(tempPart.issues[j].name) == -1)//not added
							{
	
								issuesArray.push(currentIssue.name);
								partsArray.push([])
							}
							var issueIndex = issuesArray.indexOf(currentIssue.name);
							//add said part on a set off issue arrays
							
							partsArray[issueIndex].push(tempPart.name)
						}
						
					}
				}
				
			}
			var fieldsList= [];
			for (var i = 0 ; i<issuesArray.length; i++)
			{
				fieldsList.push({'issue':issuesArray[i],'parts':partsArray[i]});
			}
			return {'name':tempSystem.name,'fields':fieldsList};
		
		}
		function WhatIsProblem(systemIndex) {
			

			if (StarterResponsePlaintext === 'DEBUG') YouBrokeTheBotFunct()
			
			var systemObj = CreateFieldsForSystems(systemIndex);
			let tempProblemEmbed = new DCME();
			tempProblemEmbed.title = 'Got it - now tell me, what\'s your '+ systemObj.name+'\'s issue?';
			tempProblemEmbed.author = ['List incomplete? Let us know on the GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot'];
			tempProblemEmbed.desc = 'What problem are you having with the system?';
			var tempFields = [];
			var fieldText;
			var error;
			for( var i = 0 ; i < systemObj.fields.length; i++)
			{
				fieldText= "";
				error = systemObj.fields[i];
				switch(error.issue)
				{
					case errors.production.name:
						
						switch(systemObj.name)
						{
							case systems.generator.name: 
								fieldText = "Producing Low Power"
							break;
							case systems.scrubber.name:
								fieldText = "CO2 levels rising"
							break;
							case systems.recycler.name:
								fieldText = "Slow gas recycling"
							break;
							case systems.charger.name:
								fieldText = "Slow battery charging"
							break;
							case systems.gravity.name:
								fieldText = "Unstable gravity uptime"
							break;
							case systems.oxygen.name:
								fieldText = "O2 levels dropping"
							break;
							case systems.pressure.name:
								fieldText = "Slow atmospheric stabilization"
							break;
							case systems.temperature.name:
								fieldText = "Slow temperature stabilization"
							break;
						}

					break;
					case errors.noHiss.name: 
						fieldText = "No hissing sound";
					break;
					case errors.retriggering.name:
						fieldText = "Alarms re-triggering after a few seconds after turning off";	
					break;
					case errors.buzzerNoise.name: 
						fieldText = "Unusual buzzer sound pattern";
					break;
					case errors.flickering.name: 
						fieldText = "CRT Monitor flickering"
					break;

					case errors.nonsenseData.name:
						fieldText= "Dispalys unstable/unreadable data"
					break;
					case errors.lowPower.name:
						fieldText ="Turned on switch has lights but monitor is off";
						if(error.parts.indexOf(defaults.parts.fan) != -1)
							fieldText += " and fan spins slow"
						
					break;
					case errors.blow.name: 
						fieldText ="When turned on, will make a loud sound and switch off immediately";
					break;
					case errors.noPower.name:
						fieldText = "When turned on, stays on but no system lights";	
					break;
					case errors.trigger.name:
						fieldText = "It's hard to turn the switch to on or to off";	
					break;

					case errors.red.name:
						fieldText ="The transformer glows red"	
					break;
					case errors.highPower.name:
						fieldText = "Producing more than necesarry"	
					break;
					case errors.highGrav.name:
						fieldText = "The gravity generator is producing higher amounts of gravity"	
					break;

				}
				tempFields.push(fieldText)
			}
			tempProblemEmbed.setFields(tempFields)
			
			message.channel.send(
				tempProblemEmbed.create()
			).then(
				async sentMessage =>{
					for( var i=0 ; i < systemObj.fields.length; i++)
					{
						
						await sentMessage.react(ReactionsStringArr[i])
					}

				}
			);
			/* message.channel.send(ProblemEmbed).then(async sentMessage => {
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
							// This section is to stop extra reactions from flowing to default, since they use the same filter
							case '🇪': return
							case '🇫': return
							case '🇬': return
							case '🇭': return
							case '🇮': return
							case '🇯': return
							case '🇰': return
							case '🇱': return
							default:
								YouBrokeTheBotFunct();
						}
					}
				});
			}); */
		}

		function FindProblem() {
			if (ProblemResponsePlaintext === 'DEBUG') YouBrokeTheBotFunct()
			ResponseToCheckAgainst = StarterResponsePlaintext + '|' + ProblemResponsePlaintext

			// From my understanding this switch statement does the job, but is slow (comparatively). Do any more experienced programmers know the best way to do this?

			// NOTE: If you don't see a condition here, I found it was impossible in my testing and removed it. These all flow to the default. Feel free to revise as versions are updated.
			switch (ResponseToCheckAgainst) {
				case 'A|A':
					return message.channel.send(PowerSupply)
				case 'A|B':
					return message.channel.send(SwitchOrFuse)
				case 'A|D':
					return message.channel.send(ProcessorDataConnector)
				case 'B|A':
					return message.channel.send(PowerSupplyPowerTransformerFuseSwitch)
				case 'B|D':
					return message.channel.send(Processor)
				case 'C|A':
					return message.channel.send(PowerSupply)
				case 'C|C':
					return message.channel.send(DataConnector)
				case 'D|A':
					return message.channel.send(SupplyOrTransformer)
				case 'D|B':
					return message.channel.send(SwitchOrFuse)
				case 'D|C':
					return message.channel.send(PumpFilterDataConnector)
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
					return message.channel.send(Fuse)
				case 'G|C':
					return message.channel.send(SupplyOrTransformer)
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
					return message.channel.send(DataConnector)
				case 'J|A':
					return message.channel.send(SupplyOrTransformer)
				case 'J|B':
					return message.channel.send(SwitchOrFuse)
				case 'J|C':
					return message.channel.send(PumpFilterDataConnector)
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
			
		}

		
		

	}
}