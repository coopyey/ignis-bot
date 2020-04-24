const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando

module.exports = class Random extends Command {
  constructor (client) {
    super(client, {
      name: 'random',
      aliases: ['rand'],
      group: 'fun',
      memberName: 'random',
      description: 'Generates a random number.',
      examples: ['random 100'],
      args: [{
          key: 'number',
          prompt: 'What is the maximum number?',
          type: 'string'
      }]
    });
  }

    async run (message, args) {
    let { number } = args;

    var cut = number.split(" ");
    var val = cut[0];

    var value = Math.floor(Math.random() * val+1);

    return message.channel.send(value)

  }; //end run
}; //end command