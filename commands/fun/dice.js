const { Command } = require('discord.js-commando');
const Discord = require('discord.js-commando'); //discord.js-commando

module.exports = class DiceCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'roll',
      aliases: ['dice'],
      group: 'fun',
      memberName: 'roll',
      description: 'Generates a random number.',
      examples: ['roll 1d4'],
      args: [{
          key: 'dice',
          prompt: 'How many dice to roll?',
          type: 'string'
      }]
    });
  }

  async run (message, args) {
    let { number } = args;

    //code here

  }; //end run
}; //end command