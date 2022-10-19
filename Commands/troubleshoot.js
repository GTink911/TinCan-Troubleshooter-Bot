﻿var StarterResponsePlaintext = 'DEBUG'
var ReactionsString = "🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱";
var ReactionsPlainString = "ABCDEFGHIJKL"
//not really sure if this is worthit

//need extra step for the split function to work zzz
var ReactionsStringArr = ["generator","computer","beacon","scrubber","recycler","light","charger","gravity","oxygen","pressure","repair","temperature"];
var ErrorsStringArr = ["retriggering", "buzzerNoise", "flickering", "nonsenseData", "lowPower", "blow", "noPower", "trigger", "red", "highPower", "highGrav"]
var ReactionsPlainStringArr = ReactionsPlainString.split("");
const { EmbedBuilder, SlashCommandBuilder, ChannelType, ActionRowBuilder, SelectMenuBuilder, ActionRow, ComponentType } = require('discord.js');

// some variables that are constant
var defaults = {
	'color' : '#58b9ff',
	'tincan' : {
		'logo' : 'https://i.imgur.com/3Bvt2DV.png',
	},
	'bot': {
		'discord': 'https://discord.gg/VReSZmzCQz',
	},
	//partNames
	'parts':{
		'filter':{'name': 'Air Filter'},
		'alarms': {'name': 'Alarms'},
		'battery' : {'name':'Large Battery'},
		'bottle':{'name': 'Bottle'},
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
		'generator': {'name':'Main Generator', 'debugName': 'generator'},
		'computer': {'name':'Main Computer', 'debugName': 'computer'},
		'beacon': {'name':'Rescue Beacon', 'debugName': 'beacon'},
		'scrubber': {'name':'CO2 Scrubber', 'debugName': 'scrubber'},
		'recycler': {'name':'CO2 to O2 Station', 'debugName': 'recycler'},
		'light': {'name':'Lighting Systems', 'debugName': 'light'},
		'charger': {'name':'Fast Battery Charger', 'debugName': 'charger'},
		'gravity': {'name':'Gravity Generator', 'debugName': 'gravity'},
		'oxygen': {'name':'O2 Generator', 'debugName': 'oxygen'},
		'pressure': {'name':'Pressure Stabilizer', 'debugName': 'pressure'},
		'repair': {'name':'Repair Station', 'debugName': 'repair'},
		'temperature': {'name':'Temperature Manager', 'debugName': 'temperature'}
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
	parts.proc
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
	parts.bottle,
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
/* errors.noHiss = {'name':'noHiss','blackList':[]}; */
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
parts.filter.issues= [errors.production/*, errors.noHiss */];
parts.alarms.issues= [errors.retriggering];
parts.battery.issues=[errors.production];
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

/**
 * The base for the Troubleshooting Embed
 */
class DCME{
	constructor()
	{
		this.color = defaults.color;
		this.title = "Looks like its time to play another game of... \n***Troubleshooting Mania!***";
		this.author= ["Need help with the bot? Join our Discord!", defaults.tincan.logo, defaults.bot.discord];
		this.desc="Thanks for playing! What system are you having troubles with, my lad/ladess?";
		this.fields=[];
		this.footer=[];
		this.defaultColor = true;
		this.defaultFields = true;
		this.fieldsInline = false;
	}
	create(){
		var ret = new EmbedBuilder();
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
			ret.setAuthor({ name: this.author[0], iconURL: this.author[1], URL: this.author[2] });
		}
		ret.setDescription (this.desc);
		
		if(!this.defaultFields)
		{
			var val_i = "React with :regional_indicator_";

			for(var i=0; i< this.fields.length; i++)
			{
		
				ret.addFields({ name: this.fields[i], value: (val_i+(ReactionsPlainStringArr[i].toLocaleLowerCase())+":!"), inline: this.fieldsInline });
			}
		}
		if ( this.fields.length >= 1)
		{
			//do some looping logic here
		}
		ret.setTimestamp();
		if ( this.footer.length >= 1)
		{
			ret.setFooter({ text: this.footer[0], iconURL: this.footer[1] });
		}
		return ret;
	}
	setColor(color)
	{
		this.color = color;
		this.defaultColor = false;
	}
	setFields(fields, inline){
		this.fields = fields;
		this.defaultFields = false;
		this.fieldsInline = inline;
	}
}

//add systems parts here
module.exports = {
	data: new SlashCommandBuilder()
		.setName('troubleshoot')
		.setDescription('Start troublehooting a problem in your Tin Can!'),
	init(){
		console.log('init test')
	},
	execute(interaction) {			
		// Sending the starting embed
		StartTroubleshoot();

		function StartTroubleshoot() {
			//create starterEmbed here
			let tempStarterEmbed = new DCME();
			var tempfields=[];
			// Add all systems to an array..
			for(let i = 0; i < defaults.systemsList.length; i++){
				tempfields.push({label: `${defaults.systemsList[i].name}`, description: `Troubleshoot an issue with your ${defaults.systemsList[i].name}.`, value: `${defaults.systemsList[i].debugName}` });
			}
			let actionRow = new ActionRowBuilder().addComponents(
				new SelectMenuBuilder()
					.setCustomId('selectEmbed1')
					.setPlaceholder('Select a system to troubleshoot!')
					.addOptions(tempfields)
			)
			// Then add that to the constructor
			tempStarterEmbed.setFields(tempfields, false);
	

			interaction.reply({ content: 'Hey there! To start troubleshooting, use the dropdown below.', components: [actionRow], ephemeral: true })
				.then(async sentinteraction => {
				ReactionLength = defaults.systemsList.length;
				// Reply to the interaction to direct the user to a DM + resolve the interaction.
				//if (interaction.channel.type != ChannelType.DM) { interaction.reply({ content: 'Check your DMs!', ephemeral: true }) } else { interaction.reply({ content: '.', ephemeral: true }) }
				const ReactionCollector = sentinteraction.createMessageComponentCollector({componentType: ComponentType.SelectMenu, time : 1000 * 10});
				ReactionCollector.on('collect', () => {
					// End the collector early and notify that it was because there was a collected item
					ReactionCollector.stop('collected');
				});

				ReactionCollector.on('end', (collected, reason) => {
					if (reason === 'time') {
						interaction.editReply({ content: 'Uh oh- you timed out!', components: [], ephemeral: true });
					} else if (reason === 'collected') {
						//for(i of collected.keys()){
							//collected.forEach( (collectedEntry) => {
								for(i of collected.values()){
									const response = i.values[0];
									console.log('collected: ' + response);
									var ReactionsStringResponseIndex = ReactionsStringArr.indexOf(response)
									if (ReactionsStringResponseIndex != -1) {
										StarterResponsePlaintext = ReactionsPlainString[ReactionsStringResponseIndex];
										return WhatIsProblem(ReactionsStringResponseIndex);
									}
									else {
										YouBrokeTheBotFunct()
									}
								}
							//});
						//}
					} else {
						// Avoiding a crash due to something not catched
						const interactionNotFound = new EmbedBuilder()
						.setColor(defaults.color)
						.setTitle('Looks like something went wrong!')
						.setAuthor({ name: 'Uh Oh!', iconURL: `${defaults.tincan.logo}` })
						.setDescription('Remember, blame Icecloud12 for this specific error. Reason: '+reason)
						.setTimestamp();
						
						return interaction.channel.send({ embeds: [interactionNotFound] });
					}
				});
				/*
				//need to do something with this section. very offputting
				for (var i = 0; i < defaults.systemsList.length; i++) {
						
					try {
						await sentinteraction.react(ReactionsStringArr[i])
					}
					catch (e) {
						if(e.code === 10008)
						{
							break;
						}
						else
						{
							//should be used to handle unexpected errors in the future.
							const interactionNotFound = new EmbedBuilder()
							.setColor(defaults.color)
							.setTitle('Error')
							.setAuthor({ name: 'Uh Oh!', iconURL: `${defaults.tincan.logo}` })
							.setDescription("Error:"+e)
							.setTimestamp()
							interaction.channel.send({ embeds: [interactionNotFound] })
						}
						
						
					}

				}	
				*/
				
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
			var tempFields = [];
			var fieldText;
			var error;
			var value;
			for( var i = 0 ; i < systemObj.fields.length; i++)
			{
				fieldText= "";
				value = "";
				error = systemObj.fields[i];
				switch(error.issue)
				{
					case errors.production.name:
						
						switch(systemObj.name)
						{
							case systems.generator.name: 
								fieldText = "Producing Low Power"
								value = 'generator'
							break;
							case systems.scrubber.name:
								fieldText = "CO2 levels rising"
								value = 'scrubber'
							break;
							case systems.recycler.name:
								fieldText = "Slow gas recycling"
								value = 'recycler'
							break;
							case systems.charger.name:
								fieldText = "Slow battery charging"
								value = 'charging'
							break;
							case systems.gravity.name:
								fieldText = "Unstable gravity uptime"
								value = 'gravity'
							break;
							case systems.oxygen.name:
								fieldText = "O2 levels dropping"
								value = 'oxygen'
							break;
							case systems.pressure.name:
								fieldText = "Slow atmospheric stabilization"
								value = 'pressure'
							break;
							case systems.temperature.name:
								fieldText = "Slow temperature stabilization"
								value = 'temperature'
							break;
						}

					break;
					/*
					case errors.noHiss.name: 
						fieldText = "No hissing sound";
					break;
					*/
					case errors.retriggering.name:
						fieldText = "Alarms re-triggering after a few seconds after turning off";	
						value = 'retriggering'
					break;
					case errors.buzzerNoise.name: 
						fieldText = "Unusual buzzer sound pattern";
						value = 'buzzerNoise'
					break;
					case errors.flickering.name: 
						fieldText = "CRT Monitor flickering"
						value = 'flickering'
					break;

					case errors.nonsenseData.name:
						fieldText= "Displays unstable/unreadable data"
						value = 'nonsenseData'
					break;
					case errors.lowPower.name:
						fieldText ="Turned on switch has lights but monitor is off";
						value = 'lowPower'
						if(error.parts.indexOf(defaults.parts.fan) != -1)
							fieldText += " and fan spins slow"
						
					break;
					case errors.blow.name: 
						fieldText ="When turned on, will make a loud sound and switch off immediately";
						value = 'blow'
					break;
					case errors.noPower.name:
						fieldText = "When turned on, stays on but no system lights";	
						value = 'noPower'
					break;
					case errors.trigger.name:
						fieldText = "It's hard to turn the switch to on or to off";	
						value = 'trigger'
					break;

					case errors.red.name:
						fieldText ="The transformer glows red"
						value = 'red'
					break;
					case errors.highPower.name:
						fieldText = "Producing more than necessary"	
						value = 'highPower'
					break;
					case errors.highGrav.name:
						fieldText = "The gravity generator is producing higher amounts of gravity"
						value = 'highGrav'
					break;

				}
				tempFields.push({fieldText, value})
			}
			let tempFields2 = [];
			for(let i = 0; i < tempFields.length; i++){
				tempFields2.push({label: `${tempFields[i].value}`, description: tempFields[i].fieldText, value: `${tempFields[i].value}`})
			}
			let actionRow2 = new ActionRowBuilder().addComponents(
				new SelectMenuBuilder()
					.setCustomId('selectEmbed2')
					.setPlaceholder('Select the issue that you\'re having!')
					.addOptions(tempFields2)
			)

			interaction.editReply({ content: 'Got it - now tell me, what\'s your '+ systemObj.name+'\'s issue?', components: [actionRow2], ephemeral: true })
			.then( async sentinteraction =>{
					const ReactionCollector2 = sentinteraction.createMessageComponentCollector({componentType: ComponentType.SelectMenu, time : 1000 * 10});
					ReactionCollector2.on('collect', () => {
						ReactionCollector2.stop('collected');
					});
					ReactionCollector2.on('end',(collected, reason) => {
						if (reason === 'time'){
							interaction.editReply({ content: 'Uh oh- you timed out!', components: [], ephemeral: true });
						} else if (reason === 'collected'){
							
							for(i of collected.values()){
								let trueI = i.values[0]
								console.log('Collected2: ' + trueI)
								//get the index of the reaction
								
								//get the associated parts
								var issueParts;
								for(let i2 = 0; i2 < systemObj.fields.length; i2++){
									if(trueI == systemObj.fields[i2].issue) issueParts = systemObj.fields[i2].parts;
								}
								console.log("issueParts: " + issueParts);
								//
								
								let finalEmbed = new DCME();
								var issuePartsText = "";
								for(var i = 0 ; i < issueParts.length; i++){
									var tempIssuesPart = SanitizePartBySystem(issueParts[i], systemObj.name);
									if ( i == 0 )
									{
										issuePartsText += tempIssuesPart;
									}
									else if (i >= 1 && i != (issueParts.length - 1))
									{
										issuePartsText +=", "+tempIssuesPart;
									}
									else if (i == (issueParts.length - 1))
									{
										issuePartsText +=" and "+tempIssuesPart;
									}
								}
								finalEmbed.title = "Check your "+issuePartsText+".";
								finalEmbed.author = ['List incomplete? Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot'];
								finalEmbed.desc = SanitizeFinalDesc(issueParts);
								console.log("issuePartsText: " + issuePartsText)
								interaction.editReply({ content:  "Check your " + issuePartsText + "!", components: [], ephemeral: true });
							}
						}
						else if (reason === 'interactionDeleted'){
							// Avoiding a crash due to interaction being deleted
							const interactionNotFound = new EmbedBuilder()
							.setColor(defaults.color)
							.setTitle('Looks like automod deleted something!')
							.setAuthor({ name: 'Uh Oh!', iconURL: `${defaults.tincan.logo}` })
							.setDescription('Unfortunately, it seems your automod deleted something it shouldn\'t have. Please add a exception for this bot :)')
							.setTimestamp();
							return interaction.channel.send({ embeds: [interactionNotFound] });
						}
						else {
							// Avoiding a crash due to something not catched
							const interactionNotFound = new EmbedBuilder()
							.setColor(defaults.color)
							.setTitle('Looks like something went wrong!')
							.setAuthor({ name: 'Uh Oh!', iconURL: `${defaults.tincan.logo}` })
							.setDescription('Remember, blame Icecloud12 for this specific error. Reason: '+reason)
							.setTimestamp();
							
							return interaction.channel.send({ embds: [interactionNotFound] });
						}
					});
					for( var i=0 ; i < systemObj.fields.length; i++)
					{
						try{
							//await sentinteraction.react(ReactionsStringArr[i])
						}
						catch (e) {
							if (e.code === 10008) {
								break;
							} else {
								//should be used to handle unexpected errors in the future.
								const interactionNotFound = new EmbedBuilder()
								.setColor(defaults.color)
								.setTitle('Error')
								.setAuthor({ name: 'Uh Oh!', iconURL: `${defaults.tincan.logo}` })
								.setDescription("Error:"+e)
								.setTimestamp()
								interaction.channel.send({ embeds: [interactionNotFound] })
							}
						}	
					}
				}
			);
			
		}

		function SanitizePartBySystem(part, systemName)
		{
			
			if (part === parts.bottle.name)
			{
				switch(systemName){
					case systems.scrubber.name: part="CO2 "+part;break;
					case systems.recycler.name: part="CO2 and O2 "+part+"s";break;
					case systems.oxygen.name: part="O2 "+part;break;
					case systems.pressure.name: part="N2 "+part;break;
					case systems.temperature.name: part="Liquid N2 "+part;break;
				}
			}
			else if (part === parts.crt.name && (systemName === systems.beacon.name || systemName === systems.repair.name))
				part="Round "+part;
		
			return part;
		}
		async function YouBrokeTheBotFunct() {

			const YouBrokeTheBot = new EmbedBuilder()
				.setTitle('Great job, you broke the bot!')
				.setAuthor({ name: 'Well this isn\'t good...', url: 'https://github.com/GTink911/TinCan-Troubleshooter-Bot' })
				.setDescription('Claim your prize by telling us what happened on [the GitHub!](https://github.com/GTink911/TinCan-Troubleshooter-Bot/issues/new) :)')
				.setTimestamp()
				.setFooter({ text: 'Thanks for using the Tin Can Troubleshooter!' })

			return interaction.channel.send({ embeds: [YouBrokeTheBot] })
			
		}
		function SanitizeFinalDesc (partsArray)
		{
			
			var isPartBroken = false;
			var brokenCrosscheckRef = [
				parts.filter.name,
				parts.alarms.name, 
				parts.battery.name, 
				parts.buzzer.name, 
				parts.crt.name, 
				parts.data.name, 
				parts.fuse.name, 
				parts.power.name, 
				parts.switch.name, 
				parts.trans.name, 
				parts.proc.name, 
				parts.pump.name];
			var isPartLevelSufficient = false;
			var levelSufficientCrosscheckRef = [parts.battery.name, parts.bottle.name];
			
			for (var i = 0; i < partsArray.length ; i++)
			{
				if(! (isPartBroken && isPartLevelSufficient))
					if (brokenCrosscheckRef.indexOf(partsArray[i]) != -1 && !isPartBroken)
					{
						isPartBroken = true;
					}
					if( levelSufficientCrosscheckRef.indexOf(partsArray[i]) != -1 && !isPartLevelSufficient)
					{
						isPartLevelSufficient = true;
					}
				else
				{
					break;
				}
			}

			var desc = "";
			var tempDesc = "";
			var sufficientPartsCounter = 0;
			if( isPartBroken)
			{
				tempDesc = "If it's black then it's busted. "
				if (desc != "")
				{
					tempDesc = " " + tempDesc;
				}
				desc += tempDesc;
			}
			if( isPartLevelSufficient)
			{
				tempDesc = "Check if the ";
				var sufficientPartsText = "";
				
				for (var i =0 ; i < levelSufficientCrosscheckRef.length; i++)
				{
					if(partsArray.indexOf(levelSufficientCrosscheckRef[i]) != -1)
					{
						sufficientPartsCounter ++;
					}	
				}
				for (var i =0 ; i < levelSufficientCrosscheckRef.length; i++)
				{
					if(partsArray.indexOf(levelSufficientCrosscheckRef[i]) != -1)
					{
						
						if(sufficientPartsText == "")
							sufficientPartsText += levelSufficientCrosscheckRef[i];
						
						else if (sufficientPartsText != "" && sufficientPartsCounter - 1 != 0)
						{
							sufficientPartsText +=", "+levelSufficientCrosscheckRef[i];
						}
						else if (sufficientPartsCounter - 1 == 0)
						{
							sufficientPartsText +=" and "+levelSufficientCrosscheckRef[i];
						}

						sufficientPartsCounter--;
					}
				}
				tempDesc += sufficientPartsText + " levels are sufficient"; 
				
				desc += tempDesc;
			}
			return desc;
		}
	}

}