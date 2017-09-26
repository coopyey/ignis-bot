//with Commando you must run with the --harmony flag: node --harmony bot.js

const Discord = require('discord.js-commando'); //discord.js-commando
const config = require('./config.json'); //login token, ownerID, botID, default prefix
const info = require('./package.json'); //meraka information
const help = require('./help.json'); //data for help command
const sqlite = require('sqlite'); //database for guild settings
const path = require('path'); //for pathing
const oneLine = require("common-tags").oneLine;
const fs = require("fs"); //file stream

const client = new Discord.Client({ owner: config.ownerID, commandPrefix: '&', disableEveryone: true });

client.registry //registers custom commands groups
	.registerGroups([
		['fun', 'Fun Commands'],
		['owner', 'Bot Owner Commands'],
		['mod', 'Moderation Commands'],
		['channels', 'Channel Administration Commands'],
		['misc', 'Miscellaneous Commands'],
		['ffxiv','Commands Related to FFXIV']
	])
	.registerDefaults() //registers built-in groups
	.registerCommandsIn(path.join(__dirname, 'commands')); //registers all commands into commands directory

 client.setProvider(
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new client.SQLiteProvider(db))).catch(console.error);

client.login(config.token);
client
	.on('error', (e) => console.error(e))
	.on('warn', (e) => console.warn(e))
	.on('debug', (e) => console.info(e))
	.on('disconnect', () => {console.warn('Disconnected!');})
	.on('reconnecting', () => {console.warn('Reconnecting...');})
	.on('commandError', (cmd, err) => {
		if (err instanceof command.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err); })
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}`); })
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`); })
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`); })
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`); })
	.on('ready', () => {
		console.log('\nName: ' + client.user.username + '\nVersion: ' + info.version + '\n');
		console.log('Logged in!\nServing ' + client.guilds.array().length +  ' servers and ' + client.users.array().length + ' users!\n');
		client.user.setGame(config.prefix + 'info | ' + config.prefix + 'help'); });

 /* client.on("message", (message) => {
	if (!message.content.startsWith(config.prefix)) return; //no prefix, break out
	if (message.author.bot) return; //author is bot, break out

	if (message.content.startsWith(config.prefix + "ping")) { //ping
		message.channel.send("Hey cutie!");
	} //end ping command

	if (message.content.startsWith(config.prefix + "help")) { //help
		//The following text block prints out the help list based on what is inside of help.json
		message.author.send("*Please note that the prefix given is the one for the server you requested help from!*\n\n" + 
				help.type[0] + config.prefix + help.command.simple[0] + help.descrip.simple[0] + "\n" +
				config.prefix + help.command.simple[1] + help.descrip.simple[1] + "\n" +
				config.prefix + help.command.simple[2] + help.descrip.simple[2]);
		message.delete(); //prunes last message
		message.channel.send(message.author.username + ", please check your DMs!");
	} //end help command

	//sends information about the bot
	if (message.content.startsWith(config.prefix + "info")) {	
		var meow = message.guild.fetchMember(config.clientID);
		let promise = new Promise((resolve, reject) => {
			setTimeout(function() {
				resolve(meow); 
				}, 250);
		});

		promise.then((successMessage) => {
			console.log(meow);
			new Discord.Permissions();
			
			
		});
		
		const embed = new Discord.RichEmbed()
			.setColor(16743166)
			.addField('Library', 'discord.js 11.1.0\ndiscord.js-commando 0.9.0', true)
			.addField('Servers', client.guilds.array().length, true)
			.addField('Users', client.users.array().length, true)
			.setDescription('**General Information**')
			.addField('Help', 'This bot is created and maintained by coopyey#7235. If you need any help, find a bug, or have a general question, please pm Coop!');

		message.channel.send({ embed });

		//Put if/then statement in to check if embeds are allowed - if not, change it so that the information is sent in text
	};

	//changes status to info/help on start
	if (message.content.startsWith(config.prefix + "status")) {
		if (message.author.id !== config.ownerID) return;
		client.user.setGame(config.prefix + "info | " + config.prefix + "help");
	} //end auto status change command

	//allows the bot owner to change Meraka's username
	if(message.content.startsWith(config.prefix + "name")) {
		if (message.author.id !== config.ownerID) return; //if bot owner != do it, leave
		let args = message.content.split(" ").slice(1);
		client.user.setUsername(args[0]);
	} //end change bot name command

	//Changes the prefix for Meraka within the config -> need to modify for multi server config file
	if(message.content.startsWith(config.prefix + "prefix")) {
		if (message.author.id !== config.ownerID) return; //if bot owner != do it, leave
		let args = message.content.split(" ").slice(1);
	  // change the configuration in memory
	  config.prefix = args[0];
	  // Now we have to save the file`	.
	  fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
	}
}); //end message event */

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err.stack}`));