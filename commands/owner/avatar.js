const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando
const config = require('../../config.json')


module.exports = class AvatarCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      aliases: ['pic'],      
      group: 'owner',
      memberName: 'avatar',
      description: 'Changes avatar.',
      examples: ['avatar <url>'],
      args: [{
          key: 'input',
          prompt: 'Please provide a url to an image.',
          type: 'string'
      }]
    });
  }

  async run (message, args) {
    let { input } = args;

    if (message.member.id != config.ownerID) {
      return message.channel.send("You don't have permission to change my avatar.")
    }

    this.client.user.setAvatar(input)
        .catch(console.error);
  }; //end run
}; //end command