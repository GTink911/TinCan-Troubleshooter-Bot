const damageresponses = [
    "Wow, that was close, but your crew managed to dodge the enemies attacks!",	
    "Despite your crew's best efforts, some light damage was taken!",
    "WARNING: FIRE DETECTED IN VEHICLE.",
    "WARNING: CONTACT WITH CREW LOST. CASUALTIES EXPECTED.",
];

const torpedoresponses = [
	"Despite your crew's best efforts, the torpedo hit and did light damage!",
	"Oh no - the torpedo hit and sensors are reporting light damage around the impact area!",
	"The torpedo hit and a fire has started!",
	"It was close, but with the data from your enhanced sensors the pilot of your vessel managed to dodge the torpedo!",
	"WARNING: CONTACT WITH VESSEL LOST. COMMUNICATIONS OFFLINE. CASUALTIES EXPECTED.",
];

const depthchargeresponses = [
	"Looks like all that training paid off - The depth charges hit and cause light damage to the enemy vessel!",
	"With a boom, your depth charges explode, causing light damage to the enemy hull and systems!",
	"Looks like you hit the jackpot - your depth charges cause some fuel to explode, light fires throughout their ship!",
	"Despite your carefully guided depth charges, the enemies nimble ship managed to dodge the explosion. Don't worry - you'll get em next time!",
	"With a final explosion, the enemy ship cracks apart and quickly sinks to the bottom of the ocean - they won't be coming back from that.'",
];

const fixfireresponses = [
	"Quickly grabbing fire extinguishers, the crew luckily managed to quickly put out the fire.",
	"With their disaster training in mind, your crew coordinates to quickly put out the flames.",
	"The crew's fire extinguishers were not enough - the fire has spread and gotten a little worse!",
	"Despite the crew's efforts, sensors are reporting the fire has gotten a little worse rather than better!",
	"Oh no, the crew's fire extinguishers aren't enough and the fire has nearly spread to the fuel! (Much worse)",
	"With a final explosion, the flames catch the fuel line. The vessel is no more.",
	"WARNING: LARGE MUNITIONS EXPLOSION DETECTED AT VESSEL. CASUALTIES EXPECTED.",
];

const attackdamageresponses = [
	"Sensing your attack, the enemy swiftly evades.",
	"The enemy vessel took light damage, but much of your attack missed.",
	"Your weapons managed to light a fire in their vessel!",
	"The enemy vessel took a lot of damage - you bet it will collapse under another hit!",
	"The enemy vessel explodes - you doubt anyone could survive that!",
];

const rocketdamageresponses = [
	"By confusing the enemy defenses, your rocket manages to hit and successfully lights several fires!",
	"By confusing the enemy defenses, your rocket manages to hit and successfully lights several fires!",
	"The rocket managed to deal light damage to the enemy!",
	"Swiftly priming their anti-rocket defenses, your rocket is immediately shot down before it could deal any damage!",
	"The rocket impacts their power grid, quickly cutting off all essential systems. They'll be dead in hours.",
];

const bombdamageresponses = [
	"The explosion dealt light damage to the enemy!",
	"The explosion dealt light damage to the enemy!",
	"The enemy vessel took heavy damage, nearly breaking through their hull!",
	"The bomb caught a fuel line, and lit a sizable fire!",
	"The bombs placement was true - the explosion catches the fuel line, and the vessel is swiftly destroyed.",
];

const eraresponses = [
	"The chosen Era is Cold War!",
	"The chosen Era is present!",
	"The chosen Era is World War II!",
	"The chosen Era is World War I!",
];

const locationresponses = [
	"The chosen type of battle is Water Only!",
	"The chosen type of battle is Air Only!",
	"The chosen type of battle is Land Only!",
	"The chosen type of battle is All Types (Land, Air, etc.)!",
	"The chosen type of battle is Nuclear Only! If the battle is in a Era in which nuclear weapons aren't available, reroll this wheel.",
];

module.exports = {
	name: 'wheel',
	description: 'Spins a wheel. Say the command without a argument to see all valid wheels.',
	async execute(message, args) {
			if (!args.length) {
		return message.channel.send(`You need to specify which wheel to spin ${message.author}! Valid wheels are:\nIncomingDamage\nTorpedo\nDepthCharge\nFixFire\nAttackDamage\nRocketDamage\nBombDamage\nEra\nType`);
		}

		else if (args[0] === 'incomingdamage') {
			const damagerollresponse = damageresponses[Math.floor(Math.random() * damageresponses.length)];
			message.channel.send(damagerollresponse);
		}

		else if (args[0] === 'torpedo') {
			const torpedorollresponse = torpedoresponses[Math.floor(Math.random() * torpedoresponses.length)];
			message.channel.send(torpedorollresponse);
		}

		else if (args[0] === 'depthcharge') {
			const depthchargerollresponse = depthchargeresponses[Math.floor(Math.random() * depthchargeresponses.length)];
			message.channel.send(depthchargerollresponse);
		}
		else if (args[0] === 'fixfire') {
			const fixfirerollresponse = fixfireresponses[Math.floor(Math.random() * fixfireresponses.length)];
			message.channel.send(fixfirerollresponse);
		}
		else if (args[0] === 'attackdamage') {
			const attackdamagerollresponse = attackdamageresponses[Math.floor(Math.random() * attackdamageresponses.length)];
			message.channel.send(attackdamagerollresponse);
		}
		else if (args[0] === 'rocketdamage') {
			const rocketdamagerollresponse = rocketdamageresponses[Math.floor(Math.random() * rocketdamageresponses.length)];
			message.channel.send(rocketdamagerollresponse);
		}		
		else if (args[0] === 'bombdamage') {
			const bombdamagerollresponse = bombdamageresponses[Math.floor(Math.random() * bombdamageresponses.length)];
			message.channel.send(bombdamagerollresponse);
		}
		else if (args[0] === 'era') {
			const erarollresponse = eraresponses[Math.floor(Math.random() * eraresponses.length)];
			message.channel.send(erarollresponse);
		}
		else if (args[0] === 'type') {
			const locationrollresponse = locationresponses[Math.floor(Math.random() * locationresponses.length)];
			message.channel.send(locationrollresponse);
		}
	},
};