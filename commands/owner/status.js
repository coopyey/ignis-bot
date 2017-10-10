const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando
const config = require("F:\\Programming\\meraka\\config.json")

module.exports = class PurgeCommand extends Command {
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

    if (message.member.id != config.ownerID) {
      return message.channel.send("You don't have permission to change my status, silly!")
    }

    this.client.user.setGame(input);
    console.log(this.client.user.presence.game);
  }; //end run
}; //end command