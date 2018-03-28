const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando

module.exports = class WhoIsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'whois',
      group: 'ffxiv',
      memberName: 'whois',
      description: 'Looks up a character on Lodestone.',
      examples: ['whois <server> <full name>'],
      args: [{
          key: 'input',
          prompt: 'I need a server, character first name, and character last name.',
          type: 'string'
      }]
    });
  }

  async run (message/*, args*/) {
    //https://www.npmjs.com/package/lodestonejs
    //let { input } = args;

    //Need parsing

    return message.channel.send("FFXIV whois command has been called. This command is still a work in progress.")    

  }; //end run
}; //end command