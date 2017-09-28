const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')

module.exports = class InfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'prune',
      aliases: ['purge'],
      group: 'channels',
      memberName: 'prune',
      description: 'Deletes messages.',
      examples: ['prune 20'],
      clientPermissions: ['MANAGE_MESSAGES'],
      args: [{
        key: 'value',
        prompt: 'Please enter a number of messages to prune.',
        type: 'integer'
      }]
    })
  }

  run (msg, { temp }) {
    while (temp > 0) {
      --temp;
      msg.delete();
    }


  }
}

/*  name is the name of the command.
    group is the command group it is a part of.
    memberName is the name of the command within the group.
    description is the help text displayed when the help command is used.
    examples is an array of examples on how to use the command. */
