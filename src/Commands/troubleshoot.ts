let StarterResponsePlaintext = 'DEBUG'
const ReactionsPlainString = "ABCDEFGHIJKL"
//not really sure if this is worthit

//need extra step for the split function to work zzz
const ReactionsStringArr = ["generator","computer","beacon","scrubber","recycler","light","charger","gravity","oxygen","pressure","repair","temperature"];
import { ButtonBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType, ButtonStyle, BaseInteraction } from 'discord.js';
import { defaultsTyping, extendedCommand } from '../Typings/interfaces.js'

// some variables that are constant
const defaults: defaultsTyping = {
	'color' : '#58b9ff',
	'tincan' : {
		'logo' : 'https://i.imgur.com/3Bvt2DV.png',
	},
	'bot': {
		'discord': 'https://discord.gg/VReSZmzCQz',
	},
	//partNames
	'parts':{
		'filter':{'name': 'Air Filter', 'issues': [] },
		'alarms': {'name': 'Alarms', 'issues': [] },
		'battery' : {'name':'Large Battery', 'issues': [] },
		'bottle':{'name': 'Bottle', 'issues': [] },
		'buzzer': {'name':'Buzzer', 'issues': [] },
		'crt': {'name':'CRT Monitor', 'issues': [] },
		'data' : {'name':'Data Connector', 'issues': [] },
		'fan' : {'name':'Fan', 'issues': [] },
		'fuse' : {'name':'Fuse', 'issues': [] },
		'power': {'name':'Power Connector', 'issues': [] },
		'switch' : {'name':'Switch', 'issues': [] },
		'trans' : {'name':'Power Transformer', 'issues': [] },
		'proc' : {'name':'Processor', 'issues': [] },
		'pump' : {'name':'Pump', 'issues': [] },
	},
	'system' : {
		'generator': { 'name':'Main Generator', 'debugName': 'generator', 'parts': [] },
		'computer': {'name':'Main Computer', 'debugName': 'computer', 'parts': [] },
		'beacon': {'name':'Rescue Beacon', 'debugName': 'beacon', 'parts': [] },
		'scrubber': {'name':'CO2 Scrubber', 'debugName': 'scrubber', 'parts': [] },
		'recycler': {'name':'CO2 to O2 Station', 'debugName': 'recycler', 'parts': [] },
		'light': {'name':'Lighting Systems', 'debugName': 'light', 'parts': [] },
		'charger': {'name':'Fast Battery Charger', 'debugName': 'charger', 'parts': [] },
		'gravity': {'name':'Gravity Generator', 'debugName': 'gravity', 'parts': [] },
		'oxygen': {'name':'O2 Generator', 'debugName': 'oxygen', 'parts': [] },
		'pressure': {'name':'Pressure Stabilizer', 'debugName': 'pressure', 'parts': [] },
		'repair': {'name':'Repair Station', 'debugName': 'repair', 'parts': [] },
		'temperature': {'name':'Temperature Manager', 'debugName': 'temperature', 'parts': [] }
	},
	'errors':{},
	'systemsList': [],
	'partsList': []
};

const systems = defaults.system;
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
const parts = defaults.parts; //so we can shortcut this 

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
	parts.power,
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
const errors = defaults.errors;
//initialize default errors
function GetBlackList(except: Array<string>, whiteList=false){
	const tempArr=[];
	for(let i = 0; i< defaults.systemsList.length; i++)
	{
		if(!whiteList)
		{
			if((except.indexOf(defaults.systemsList[i].name)!= -1) )
			{
				tempArr.push(defaults.systemsList[i].name);
			}

		}
		else if (whiteList)
		{
			if(except.indexOf(defaults.systemsList[i].name)== -1)
			{
				tempArr.push(defaults.systemsList[i].name);
			}
		}	

	}
	return tempArr;
}

const finalActionRow = new ActionRowBuilder<ButtonBuilder>()
	.addComponents(
		new ButtonBuilder()
			.setStyle(ButtonStyle.Link)
			.setURL(defaults.bot.discord)
			.setLabel('Discord'),
		new ButtonBuilder()
			.setStyle(ButtonStyle.Link)
			.setURL('https://github.com/GTink911/TinCan-Troubleshooter-Bot')
			.setLabel('GitHub')
	)

errors.production = {'name':'production','blackList':GetBlackList(
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
errors.highPower = {'name':'highPower','blackList':GetBlackList([systems.generator.name],true)};
errors.highGrav = {'name':'highGrav','blackList':GetBlackList([systems.gravity.name],true)};

//initialize part issues here
parts.filter.issues= [errors.production];
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
export const data = new SlashCommandBuilder()
	.setName('troubleshoot')
	.setDescription('Start troublehooting a problem in your Tin Can!');
export function execute(interaction: extendedCommand) {
	// Sending the starting embed
	StartTroubleshoot();

	function StartTroubleshoot() {
		const tempfields = [];
		// Add all systems to an array..
		for (let i = 0; i < defaults.systemsList.length; i++) {
			tempfields.push({ label: `${defaults.systemsList[i].name}`, description: `Troubleshoot an issue with your ${defaults.systemsList[i].name}.`, value: `${defaults.systemsList[i].debugName}` });
		}
		const actionRow = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
			new SelectMenuBuilder()
				.setCustomId('selectEmbed1')
				.setPlaceholder('Select a system to troubleshoot!')
				.addOptions(tempfields)
		);

		interaction.reply({ content: 'Hey there! To start troubleshooting, use the dropdown below.', components: [actionRow], ephemeral: true })
			.then(async (sentinteraction) => {
				// Reply to the interaction to direct the user to a DM + resolve the interaction.
				const ReactionCollector = sentinteraction.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 1000 * 60 });
				ReactionCollector.on('collect', (interaction: BaseInteraction) => {
					if(!interaction.isSelectMenu()) return;
					// End the collector early and notify that it was because there was a collected item
					ReactionCollector.stop('collected');
					const response = interaction.values[0];
					console.log('collected: ' + response);
					const ReactionsStringResponseIndex = ReactionsStringArr.indexOf(response);
					if (ReactionsStringResponseIndex != -1) {
						StarterResponsePlaintext = ReactionsPlainString[ReactionsStringResponseIndex];
						return WhatIsProblem(ReactionsStringResponseIndex);
					} else {
						YouBrokeTheBotFunct();
					}
				});

				ReactionCollector.on('end', (collected, reason) => {
					if (reason === 'time') interaction.editReply({ content: 'Uh oh- you timed out!', components: [] });
				});

			});
	}
	function CreateFieldsForSystems(systemIndex: number) {
		const issuesArray: Array<string> = [];
		const partsArray: Array<Array<string>> = [];
		//get the system parts
		const tempSystem = defaults.systemsList[systemIndex];
		const tempSystemParts = tempSystem.parts;
		const allParts = defaults.partsList;

		for (let i = 0; i < allParts.length; i++) //using defaults.parts instead so its orderly
		{
			const partIndex = tempSystemParts.indexOf(allParts[i]);
			if (partIndex != -1) {
				const tempPart = allParts[i];

				for (let j = 0; j < tempPart.issues.length; j++) {
					const currentIssue = tempPart.issues[j];

					//check if not blacklisted
					if (currentIssue.blackList.indexOf(tempSystem.name) == -1) {
						if (issuesArray.indexOf(tempPart.issues[j].name) == -1) //not added
						{
							issuesArray.push(currentIssue.name);
							partsArray.push([]);
						}
						const issueIndex = issuesArray.indexOf(currentIssue.name);
						//add said part on a set off issue arrays
						partsArray[issueIndex].push(tempPart.name);
					}

				}
			}

		}

		interface field {
			issue: string;
			parts: Array<string>;
		}
		const fieldsList: Array<field> = [];
		for (let i = 0; i < issuesArray.length; i++) {
			fieldsList.push({ 'issue': issuesArray[i], 'parts': partsArray[i] });
		}
		return { 'name': tempSystem.name, 'fields': fieldsList };

	}
	function WhatIsProblem(systemIndex: number) {

		if (StarterResponsePlaintext === 'DEBUG')
			YouBrokeTheBotFunct();

		const systemObj = CreateFieldsForSystems(systemIndex);
		const tempFields = [];
		let fieldText;
		let error;
		let value;
		let name;
		for (let i = 0; i < systemObj.fields.length; i++) {
			fieldText = "";
			value = "";
			error = systemObj.fields[i];
			switch (error.issue) {
				case errors.production.name:

					switch (systemObj.name) {
						case systems.generator.name:
							fieldText = "Producing Low Power";
							value = 'generator';
							break;
						case systems.scrubber.name:
							fieldText = "CO2 levels rising";
							value = 'scrubber';
							break;
						case systems.recycler.name:
							fieldText = "Slow gas recycling";
							value = 'recycler';
							break;
						case systems.charger.name:
							fieldText = "Slow battery charging";
							value = 'charging';
							break;
						case systems.gravity.name:
							fieldText = "Unstable gravity uptime";
							value = 'gravity';
							break;
						case systems.oxygen.name:
							fieldText = "O2 levels dropping";
							value = 'oxygen';
							break;
						case systems.pressure.name:
							fieldText = "Slow atmospheric stabilization";
							value = 'pressure';
							break;
						case systems.temperature.name:
							fieldText = "Slow temperature stabilization";
							value = 'temperature';
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
					value = 'retriggering';
					name = 'Alarms re-triggering';
					break;
				case errors.buzzerNoise.name:
					fieldText = "Unusual buzzer sound pattern";
					value = 'buzzerNoise';
					break;
				case errors.flickering.name:
					fieldText = "CRT Monitor flickering";
					value = 'flickering';
					break;

				case errors.nonsenseData.name:
					fieldText = "Displays unstable/unreadable data";
					value = 'nonsenseData';
					break;
				case errors.lowPower.name:
					fieldText = "Turned on switch has lights but monitor is off";
					value = 'lowPower';
					if (error.parts.indexOf(defaults.parts.fan.name) != -1)
						fieldText += " and fan spins slow";

					break;
				case errors.blow.name:
					fieldText = "When turned on, makes a loud sound and turns off imnstantly";
					value = 'blow';
					name = 'Fuse blowing';
					break;
				case errors.noPower.name:
					fieldText = "When turned on, stays on but no system lights";
					value = 'noPower';
					break;
				case errors.trigger.name:
					fieldText = "It's hard to turn the switch to on or to off";
					value = 'trigger';
					name = 'Switch is hard to toggle';
					break;

				case errors.red.name:
					fieldText = "The transformer glows red";
					value = 'red';
					break;
				case errors.highPower.name:
					fieldText = "Producing more than necessary";
					value = 'highPower';
					break;
				case errors.highGrav.name:
					fieldText = "The gravity generator is producing higher amounts of gravity";
					value = 'highGrav';
					name = 'High gravity';
					break;

			}
			tempFields.push({ fieldText, value, name });
		}
		const tempFields2 = [];
		for (let i = 0; i < tempFields.length; i++) {
			tempFields2.push({ label: tempFields[i].name || tempFields[i].fieldText, description: tempFields[i].fieldText, value: `${tempFields[i].value}` });
		}
		const actionRow2 = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
			new SelectMenuBuilder()
				.setCustomId('selectEmbed2')
				.setPlaceholder('Select the issue that you\'re having!')
				.addOptions(tempFields2)
		);

		interaction.editReply({ content: 'Got it - now tell me, what\'s your ' + systemObj.name + '\'s issue?', components: [actionRow2] })
			.then(async (sentinteraction) => {
				const ReactionCollector2 = sentinteraction.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 1000 * 60 });
				ReactionCollector2.on('collect', (interaction: BaseInteraction) => {
					if(!interaction.isSelectMenu()) return;
					ReactionCollector2.stop('collected');
					const trueI = interaction.values[0];
					console.log('Collected2: ' + trueI);
					//get the index of the reaction
					//get the associated parts
					let issueParts: Array<string> = [];
					for (let i2 = 0; i2 < systemObj.fields.length; i2++) {
						if (trueI == systemObj.fields[i2].issue) issueParts = systemObj.fields[i2].parts;
					}
					console.log("issueParts: " + issueParts);
					
					let issuePartsText = "";
					for (let i = 0; i < issueParts.length; i++) {
						const tempIssuesPart = SanitizePartBySystem(issueParts[i], systemObj.name);
						if (i == 0) {
							issuePartsText += tempIssuesPart;
						}
						else if (i >= 1 && i != (issueParts.length - 1)) {
							issuePartsText += ", " + tempIssuesPart;
						}
						else if (i == (issueParts.length - 1)) {
							issuePartsText += " and " + tempIssuesPart;
						}
					}
					const issuePartsDesc = SanitizeFinalDesc(issueParts);
					console.log("issuePartsText: " + issuePartsText);
					console.log("issuePartsDesc: " + issuePartsDesc);
					interaction.editReply({ content: "Check your " + issuePartsText + "! " + issuePartsDesc, components: [finalActionRow] });
				});
				ReactionCollector2.on('end', (collected, reason) => {
					if (reason === 'time') interaction.editReply({ content: 'Uh oh- you timed out!', components: [] });
				});
			}
			);

	}

	function SanitizePartBySystem(part: string, systemName: string) {

		if (part === parts.bottle.name) {
			switch (systemName) {
				case systems.scrubber.name: part = "CO2 " + part; break;
				case systems.recycler.name: part = "CO2 and O2 " + part + "s"; break;
				case systems.oxygen.name: part = "O2 " + part; break;
				case systems.pressure.name: part = "N2 " + part; break;
				case systems.temperature.name: part = "Liquid N2 " + part; break;
			}
		}
		else if (part === parts.crt.name && (systemName === systems.beacon.name || systemName === systems.repair.name))
			part = "Round " + part;

		return part;
	}
	async function YouBrokeTheBotFunct() {

		const YouBrokeTheBot = new EmbedBuilder()
			.setTitle('Great job, you broke the bot!')
			.setAuthor({ name: 'Well this isn\'t good...', url: 'https://github.com/GTink911/TinCan-Troubleshooter-Bot' })
			.setDescription('Claim your prize by telling us what happened on [the GitHub!](https://github.com/GTink911/TinCan-Troubleshooter-Bot/issues/new) :)')
			.setTimestamp()
			.setFooter({ text: 'Thanks for using the Tin Can Troubleshooter!' });

		return interaction.editReply({ embeds: [YouBrokeTheBot] });

	}
	function SanitizeFinalDesc(partsArray: Array<string>) {

		let isPartBroken = false;
		const brokenCrosscheckRef = [
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
			parts.pump.name
		];
		let isPartLevelSufficient = false;
		const levelSufficientCrosscheckRef = [parts.battery.name, parts.bottle.name];

		for (let i = 0; i < partsArray.length; i++) {
			if (!(isPartBroken && isPartLevelSufficient))
				if (brokenCrosscheckRef.indexOf(partsArray[i]) != -1 && !isPartBroken) {
					isPartBroken = true;
				}
			if (levelSufficientCrosscheckRef.indexOf(partsArray[i]) != -1 && !isPartLevelSufficient) {
				isPartLevelSufficient = true;
			}

			else {
				break;
			}
		}

		let desc = "";
		let tempDesc = "";
		let sufficientPartsCounter = 0;
		if (isPartBroken) {
			tempDesc = "If it's black then, it may be damaged. ";
			if (desc != "") {
				tempDesc = " " + tempDesc;
			}
			desc += tempDesc;
		}
		if (isPartLevelSufficient) {
			tempDesc = "Check if the ";
			let sufficientPartsText = "";

			for (let i = 0; i < levelSufficientCrosscheckRef.length; i++) {
				if (partsArray.indexOf(levelSufficientCrosscheckRef[i]) != -1) {
					sufficientPartsCounter++;
				}
			}
			for (let i = 0; i < levelSufficientCrosscheckRef.length; i++) {
				if (partsArray.indexOf(levelSufficientCrosscheckRef[i]) != -1) {

					if (sufficientPartsText == "")
						sufficientPartsText += levelSufficientCrosscheckRef[i];

					else if (sufficientPartsText != "" && sufficientPartsCounter - 1 != 0) {
						sufficientPartsText += ", " + levelSufficientCrosscheckRef[i];
					}
					else if (sufficientPartsCounter - 1 == 0) {
						sufficientPartsText += " and " + levelSufficientCrosscheckRef[i];
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