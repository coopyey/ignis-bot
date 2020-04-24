const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando

module.exports = class DiceCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'roll',
      aliases: ['dice'],
      group: 'fun',
      memberName: 'roll',
      description: 'Generates a random number based on a dice roll.',
      examples: ['roll 1d4'],
      args: [{
          key: 'number',
          prompt: 'How many dice to roll?',
          type: 'string'
      }]
    });
  }

  async run (message, args) {
    let { number } = args;

    var cut = number.split("d");

    var dice = cut[0];
    var sides = cut[1];

    var counter = 0;
    var total = 0;
    var value = 0;

    while (counter < dice) {
      value = Math.floor(Math.random() * sides+1);
      total += value;
      counter++;
    }

    return message.channel.send(total);

  }; //end run
}; //end command