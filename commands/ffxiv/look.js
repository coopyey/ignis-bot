const { Command } = require('discord.js-commando');
const config = require('..\\..\\config.json'); //login token, ownerID, botID, default prefix
const xivapi = require('xivapi-js');

const xiv = new xivapi({ private_key: config.xivapitoken, language: 'en' });

module.exports = class LookCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'look',
      group: 'ffxiv',
      memberName: 'look',
      description: 'Looks up a character on Lodestone.',
      examples: ['look <server> <full name>'],
      args: [{
          key: 'input',
          prompt: 'I need a server, character first name, and character last name.',
          type: 'string'
      }]
    });
  }

  async run (message, args) {
    let { input } = args; 
    var done = input.split(" ");

    var server = done[0];
    var first = done[1];
    var last = done[2];

    console.log(`Running lookup on ${input}.`);

    let res = await xiv.character.search(`${first} ${last}`, {server: server})
    let char = res.Results[0].Name
    
    xiv.search(`${first} ${last}`, {server: server}).then((response) => {
      console.log(char);
    }).catch((error) => {
      console.log(`Error: ${error}`)
    })

    return message.channel.send(`${first} ${last} on ${server} successfully found!`)
  }; //end run
}; //end command