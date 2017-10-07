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
      args: [{
          key: 'number',
          prompt: 'How many messages to purge?',
          type: 'integer'
      }]
    });
  }

  async run (message, args) {
    let { number } = args;

    if (number > 100 || number < 2) {
      return message.channel.send('Please prune between 2 and 100 messages.')
    }

    if (!message.channel.permissions.has(this.client.user).has('MANAGE_MESSAGES')) {
      return message.channel.send("Help! I don't have permission to manage messages!")
    }

    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send("You don't have permission to manage messages.")
    }

    message.channel.fetchMessages({limit: number}).then(messages => { 
      message.channel.bulkDelete(messages)
      message.channel.send(`Removed ${messages.size} messages.`)})
  }; //end run
}; //end command