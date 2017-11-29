//with Commando you must run with the --harmony flag: node --harmony bot.js

const Discord = require('discord.js-commando'); //discord.js-commando
const command = require('discord.js-commando')
const config = require('./config.json'); //login token, ownerID, botID, default prefix
const info = require('./package.json'); //meraka information
const sqlite = require('sqlite'); //database for guild settings
const path = require('path'); //for pathing
const oneLine = require("common-tags").oneLine;
const fs = require("fs"); //file stream

const client = new Discord.Client({ owner: config.ownerID, commandPrefix: 'i.', disableEveryone: true });

client.registry //registers custom commands groups
	.registerGroups([
		['fun', 'Fun Commands'],
		['owner', 'Bot Owner Commands'],
		['mod', 'Moderation Commands'],
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

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err.stack}`));