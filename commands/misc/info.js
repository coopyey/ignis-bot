const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')

module.exports = class InfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'info',
      group: 'misc',
      memberName: 'info',
      description: 'Gives you information about the bot.',
      examples: ['info']
    })
  }

  hasPermission (msg) {
    return this.client.isOwner(msg.author)
  }

  //In the event embed permissions aren't given
  run (msg) {
    if (msg.channel.type !== 'dm') {
      if (!msg.channel.permissionsFor(this.client.user).has('EMBED_LINKS')) {
        return msg.say('__General Information__\n**Library:** discord.js 11.1.0\n' + 
                                '\n\n__Help:__\nThis bot is created and maintained by coopyey#7235. If you need any help, find a bug, or have a question, please pm Coop!')
      }
    };

    const embed = new RichEmbed()
            .setColor(0x9F9FFF)
            .setDescription('**General Information**')
            .addField('Library', 'discord.js', true)  
            .addField('Framework', 'discord.js commando', true)          
            .addField('Help', 'This bot is created and maintained by coopyey#7235. If you need any help, find a bug, or have a question, please pm Coop!')
    return msg.embed(embed)
  }
}

/*  name is the name of the command.
    group is the command group it is a part of.
    memberName is the name of the command within the group.
    description is the help text displayed when the help command is used.
    examples is an array of examples on how to use the command. */
