var errors = {
    // List evvverrrryyy error in the game and their translated text.
    'PB28' : 'Sys_Low_Power',
    'MAP5' : 'Too_High_Power_Sys',
    '2NOA' : 'On_Battery',
    'KA02' : 'Pod_High_CO2',
    'AR22' : 'Dirty_Filter',
    '01JE' : 'Low_Bar',
    'AN93' : 'High_Bar',
    'PN82' : 'Low_Oxy_Prod',
    '017H' : 'Pod_Too_Low_Oxy',
    'TB65' : 'Too_High_O2',
    'NA82' : 'Low_Pump',
    'ABT6' : 'Full_Bottle',
    'P0J3' : 'Low_Bottle',
    'BKEE' : 'Empty_Bottle',
    '02NE' : 'Bad_Bat',
    '9LOF' : 'Low_Bat',
    '0NE4' : 'Bad_Elec_Con',
    '0BEA' : 'Bad_Power_Trans',
    '0000' : 'Shows in the manual but has no text',
    'MAAG' : 'Bad_Buzz',
    '01N2' : 'Bad_Data',
    'MPAA' : 'Bad_Fuse',
    '017K' : 'Bad_Caution_Alarm',
    'PAN8' : 'Bad_Master_Alarm',
    'JKL1' : 'Bad_Monitor',
    'BZ67' : 'Bad_Proc',
    'TR22' : 'Low_Grav',
    'TR23' : 'Excess_Grav',
    '9B2L' : 'Bad_Switch',
    'TY2B' : 'Bad_Filter'
}

module.exports = {
	name: 'errortranslate',
	description: 'Translate raw error codes to their readable text.',
	async execute(message, args) {
        // Testing if the error code is invalid (not 4 characters long) or does not exist
        if (!args[0]) return message.channel.send('Please provide an error code.');
		if (!args[0].length == 4) return message.channel.send('This error code is invalid.');
        if (!errors[args[0]]) return message.channel.send('This error code is invalid.');

        // Return the translated error code.
        return message.channel.send(`This error code translates to: \'${errors[args[0]]}\'.`);
	},
};