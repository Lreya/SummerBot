const Discord = require('discord.js');
const { mongo } = require("../connect");
const classes = require("../classes.json");
const { prefix } = require("../config.json");


async function add(message, args) {

  let date = new Date().toDateString();

  let gs;

  args[0] >= args[1] ? gs = args[0] + args[2] : gs = args[1] + args[2];

  let gear2 = {
    "discordID": message.author.id,
    "ap": args[0],
    "aap": args[1],
    "dp": args[2],
    "level": args[3],
    "character": args[4],
    "family": args[5],
    "class": args[6],
    "gearscore": gs,
    "lastUpdated": date
  };

  try{
    const db = mongo.db('summerbot');
    const col = db.collection('geardb');

    const p = await col.findOne({discordID: message.author.id});

    if(p !== null) {
      message.channel.send('Your gear exists in the database already!');
      return;
    }

    await col.insertOne(gear2);
    console.log('inserted.');
    message.channel.send('Data inserted.');

  } catch(err) {
    console.log(err.stack);
    message.channel.send('Unsuccessful');
  } finally {
  }

  // const p = await
}

module.exports = {
  name: 'add',
  description: 'add your gear to the gearbot',
  execute: function(message, args) {

    const usageMsg = `${prefix}add <ap> <aap> <dp> <level> <Character> <Family> <class> (without brackets)`

    if(args.length < 7) {
      message.channel.send(usageMsg);
      return;
    }

    if(args[7]) {
      args[6] += ` ${args[7]}`;
    }

    args[6] = args[6].toLowerCase();

    if(classes[args[6]]) {
      args[6] = classes[args[6]];
    } else {
      message.channel.send(usageMsg);
      return;
    }

    for (let i = 0; i < 4; i++) {
      args[i] = parseInt(args[i]);

      if(!Number.isInteger(args[i])) {
        message.channel.send(usageMsg);
      }
    }
    add(message, args);
  },
}
