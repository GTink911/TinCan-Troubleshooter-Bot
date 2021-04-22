const shutdown = require("./shutdown");

var ShutdownRepeatedMarkerNumber = 0;
//var devtoolkitarg = args[0]
//var devtoolkitarg2 = args[1]
//var devtoolkitarg3 = args[2]

module.exports = {
	name: 'devtoolkit',
	description: 'Various development tools. Locked to owner only, unless a 4 digit passcode is provided.',
    async execute(message, args, client, inprogressgames, config, devtoolkitarg, devtoolkitarg2, devtoolkitarg3) {
//        var devtoolkitarg = args[0]
//        var devtoolkitarg2 = args[1]
//        var devtoolkitarg3 = args[2]
        let filter = m => m.author.id === message.author.id
        if (message.author.id != '390674838408134659') {
            message.channel.send(`You do not have access to this command. To override this restriction, please state the 4 digit security code. To cancel, simply say cancel.`);
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
                .then(message => {
                    message = message.first()
                    if (message.content.toUpperCase() == 'CANCEL') {
                        message.channel.send(`Canceling.`)
                        return;
                    } else if (message.content.toUpperCase() == `${config.devtoolkitbackupcode}`) {
                        message.channel.send(`Backup code used; authorization granted.`)
                        message.delete;
                        devtoolkitaccessauthorized(message, args, client, inprogressgames, devtoolkitarg, devtoolkitarg2, devtoolkitarg3)
                    } else {
                        message.channel.send(`Invalid Response, canceling. To retry, run the command again,`)
                    }
                })
                .catch(collected => {
                    message.channel.send('Timed out, canceling.');
                    return;
                });
        } else {
            devtoolkitaccessauthorized(message, args, client, inprogressgames, devtoolkitarg, devtoolkitarg2, devtoolkitarg3);
        }

	},
};





function devtoolkitaccessauthorized(message, args, client, inprogressgames) {
    console.log('WARNING: Developer toolkit has been activated.');
    if (args[0] == undefined) {
        return message.reply(`you didn't provide any arguments. Please use \`!devtoolkit [Command you want to use]\`, or \`!devtoolkit help\` for a list of all commands. You will have to reauthorize yourself.`);
    }
    message.channel.send(`Placeholder success, authorized. The command which you were going to use was ${devtoolkitarg}. The optional variables were ${devtoolkitarg2} and ${devtoolkitarg3}`);

    if (devtoolkitarg == 'shutdown') {
        if (ShutdownRepeatedMarkerNumber === 1) {
            message.reply(`OK - shutting myself down!`)
            console.log('Hey - I\'m shutting down :3')
            return process.exit()
        } else {
            message.reply('are you sure you want to shutdown the bot? WARNING: THIS WILL PURGE ALL STORED DATA. Do the command again to confirm.');
            ShutdownRepeatedMarkerNumber++;
            return
        }
    } else if (devtoolkitarg == 'addconst') {
        const devtoolkitarg2 = devtoolkitarg3
    } else if (devtoolkitarg == 'addvar') {
        var devtoolkitarg2 = devtoolkitarg3
    } else if (devtoolkitarg == 'variablevalue') {
        if (devtoolkitarg2 == undefined) {
            message.channel.send('You have not specified a variable to show the value of. Alternatively, the variable is undefined. Please use \'!devtoolkit variablevalue [Variable Name]\'.')
        } else {
            message.channel.send(`The variable's value is ${devtoolkitarg2}`);
        }
    }
}