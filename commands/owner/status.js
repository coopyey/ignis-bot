const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando
const config = require("../../config.json")

module.exports = class StatusCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'game',
      aliases: ['status'],      
      group: 'owner',
      memberName: 'game',
      description: 'Changes game status.',
      examples: ['status <string>'],
      args: [{
          key: 'input',
          prompt: 'Please provide a status message.',
          type: 'string'
      }]
    });
  }

  async run (message, args) {
    let { input } = args;
    let { keys } = input.split(' ');

    if (message.member.id != config.ownerID) {
      return message.channel.send("You don't have permission to change my status.")
    }

    this.client.user.setActivity(`${input}`, {type: 'LISTENING'})
      .then(user => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))   
      .catch(console.error);
  }; //end run
}; //end command
