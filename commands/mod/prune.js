const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando

module.exports = class PurgeCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'prune',
      aliases: ['purge','delete'],
      group: 'mod',
      memberName: 'prune',
      description: 'Deletes messages.',
      examples: ['prune 4'],
      clientPermissions: ['MANAGE_MESSAGES'],
      args: [{
          key: 'value',
          prompt: 'How many messages to purge?',
          type: 'integer',
        validate: m => {
          if (m < 100 || m > 2) return true;
          return 'Please specify a number between 2 and 100.'
        }
      }]
    });
  }

  async run (message, args) {
    //deletes discord extremes - no specification yet
    let { number } = args;

    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send("You don't have permission to manage messages.")
    }

    message.channel.fetchMessages({limit: args}).then(messages => { message.channel.bulkDelete(messages) })
  };
};
