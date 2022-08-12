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
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	    .setName('errortranslate')
	    .setDescription('Translate raw error codes to their readable text.')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('The error code to translate.')
                .setRequired(true)),
	execute(interaction) {
        // Testing if the error code is invalid (not 4 characters long) or does not exist
        const testedarg = interaction.options.getString('code').toUpperCase();
        // Above does not work for some reason. Previously it did so idk. Changed to current
		if (testedarg.length > 4 || testedarg.length < 4) return interaction.reply({ content: 'This error code is too short or too long.', ephemeral: true });
        if (!errors[testedarg]) return interaction.reply({ content: 'This error code does not exist.', ephemeral: true });

        // Return the translated error code.
        return interaction.reply({ content: `This error code translates to: \'${errors[testedarg]}\'.`, ephemeral: true });
	},
};  