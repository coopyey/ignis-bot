const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando
const config = require("../../config.json")

module.exports = class NameCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'name',
      aliases: ['un'],      
      group: 'owner',
      memberName: 'name',
      description: 'Changes username.',
      examples: ['name <string>'],
      args: [{
          key: 'input',
          prompt: 'Please provide a new name.',
          type: 'string'
      }]
    });
  }

  async run (message, args) {
    let { input } = args;

    if (message.member.id != config.ownerID) {
      return message.channel.send("You don't have permission to change my name.")
    }

    this.client.user.setUsername(input)
        .then(user => console.log(`My new username is ${user.username}.`))   
        .catch(console.error);
  }; //end run
}; //end command