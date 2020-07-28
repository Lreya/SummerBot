const Discord = require('discord.js');
const { mongo } = require("../connect");
const classes = require ("../classes.json");
const { prefix } = require("../config.json");

async function updateGear (message, args) {
  try{
    const guild = message.guild.id;
    const db = mongo.db('summerbot');
    const col = db.collection(guild);

    let update = {};
    let gs = 0;
    update[args[0]] = args[1];
    let date = new Date().toDateString();

    const f = args[0];

    const p = await col.findOne({discordID: message.author.id});

    if(p === null) {
      message.channel.send(`Please add your gear first using ${prefix}add command.`);
      return;
    }

    const up = await col.updateOne(
      {"discordID": message.author.id}, {$set: update});

    const lastupdated = await col.updateOne(
      {"discordID": message.author.id}, {$set: {lastUpdated: date}});

    const n = await col.findOne({discordID: message.author.id});

    n.ap >= n.aap ? gs = n.ap + n.dp : gs = n.aap + n.dp;

    console.log(gs);

    const upGS = await col.updateOne(
      {"discordID": message.author.id}, {$set: {gearscore: gs}});

    message.channel.send('Updated.');

  } catch (err) {
    message.channel.send('Failed to update');
  } finally {

  }
}

module.exports = {
  name: 'update',
  description: 'specify a field to update followed by the new value.',
  execute (message, args) {

    const usageMsg = `${prefix}update <field> <value> (without brackets)
ex: \`${prefix}update aap 261\``;

    const usageMsgClass= `Enter a valid class.`;

    const field = ['ap', 'aap', 'dp', 'level', 'character', 'family', 'class'];

    args[0] = args[0].toLowerCase();

    // check if valid field to update.
    let index = field.findIndex(current => current === args[0]);

    if(index >= 0)
    {
      // if arg must be a numeric value
      if(index < 4) {
        args[1] = parseInt(args[1]);

        if(!Number.isInteger(args[1])) {
          message.channel.send(usageMsg);
          return;
        }
      } else if(index === 6) {
        if(args[2])
        {
          args[1] += ` ${args[2]}`;
        }
        args[1] = args[1].toLowerCase();

        if(classes[args[1]]) {
          args[1] = classes[args[1]];
        } else {
          message.channel.send(usageMsgClass);
          return;
        }

      }


      updateGear(message, args);
      // error checking
    } else {
      message.channel.send(usageMsg);
    }



  }
}
