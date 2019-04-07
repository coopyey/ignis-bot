const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando

module.exports = class LookCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'look',
      group: 'ffxiv',
      memberName: 'look',
      description: 'Looks up a character on Lodestone.',
      examples: ['look <server> <full name>'],
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

    return message.channel.send("FFXIV look command has been called. This command is still a work in progress.")    

  }; //end run
}; //end command