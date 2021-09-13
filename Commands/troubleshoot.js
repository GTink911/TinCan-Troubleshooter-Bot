var StarterResponsePlaintext = 'DEBUG'
var ProblemResponsePlaintext = 'DEBUG'
var ResponseToCheckAgainst = 'DEBUG'

var ReactionsString = "🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱";
var ReactionsPlainString = "ABCDEFGHIJKL"
//not really sure if this is worthit

//need extra step for the split function to work zzz
var ReactionsStringArr = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱"];
var ReactionsPlainStringArr = ReactionsPlainString.split("");
var ReactionLength = 0;

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
				ret.setDescription (this.desc);
				
				if(!this.defaultFields)
				{
					var val_i = "'React with :regional_indicator_";

					for(var i=0; i< this.fields.length; i++)
					{
				
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
				
				ReactionLength = defaults.systemsList.length;
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
			let problemEmbed = new DCME();
			problemEmbed.title = 'Got it - now tell me, what\'s your '+ systemObj.name+'\'s issue?';
			problemEmbed.author = ['List incomplete? Let us know on the GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot'];
			problemEmbed.desc = 'What problem are you having with the system?';
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
			problemEmbed.setFields(tempFields)
			
			message.channel.send(
				problemEmbed.create()
			).then(
				async sentMessage =>{
					
					const ReactionCollector = sentMessage.createReactionCollector(filter, { max: 1, time: 30000 });
					ReactionCollector.on('end',(collected, reason) => {
						if (reason === 'time'){
							sentMessage.channel.send('Uh oh- you timed out!');
						}
						else
						{
							const userReaction = collected.array()[0];
						
							const response = userReaction._emoji.name;
							
							//get the index of the reaction
							var issuesIndex = ReactionsStringArr.indexOf(response);
							
							//get the associated parts
							var issueParts = systemObj.fields[issuesIndex].parts;

							//
							let finalEmbed = new DCME();
							var issuePartsText = "";
							for(var i = 0 ; i < issueParts.length; i++)
							{
								var tempIssuesPart = SanitizePartBySystem(issueParts[i], systemObj.name);
								if ( i == 0 )
								{
									issuePartsText += tempIssuesPart;
								}
								else if (i >= 1 && i != (issueParts.length -1))
								{
									issuePartsText +=", "+tempIssuesPart;
								}
								else if (i == (issueParts.length -1))
								{
									issuePartsText +=" and "+tempIssuesPart;
								}
							}
							finalEmbed.title = "Check your "+issuePartsText+".";
							finalEmbed.author = ['List incomplete? Want to help us improve? Click here to go to our GitHub!', 'https://i.imgur.com/3Bvt2DV.png', 'https://github.com/GTink911/TinCan-Troubleshooter-Bot'];
							finalEmbed.desc = SanitizeFinalDesc(issueParts);
							message.channel.send(finalEmbed.create());
						}
					});
					for( var i=0 ; i < systemObj.fields.length; i++)
					{
						await sentMessage.react(ReactionsStringArr[i])
					}
					
				}
			);
			
			
		}

		function SanitizePartBySystem(part, systemName)
		{
			
			if (
				[parts.battery.name, parts.fuse.name, parts.power.name, parts.trans.name].indexOf(part) != -1 && 
				[systems.gravity.name, systems.generator.name].indexOf(systemName) != -1
			)
				part += "HC "+part;
			else if (part === parts.bottle.name)
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
			message.channel.send(YouBrokeTheBot)
			
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