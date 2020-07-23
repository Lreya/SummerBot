const Discord = require('discord.js');
const { mongo } = require("../connect");
const classes = require ("../classes.json");
const { prefix } = require("../config.json");

async function updateGear (message, args) {
  try{
    const db = mongo.db('summerbot');
    const col = db.collection('geardb');

    let update = {};
    update[args[0]] = args[1];

    const f = args[0];

    const up = await col.updateOne(
      {"discordID": message.author.id}, {$set: update});

    message.channel.send('Updated.');

    // if(del.deletedCount > 0) {
    //   message.channel.send('Successfully deleted');
    // }


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
    args.forEach( (current, index) => args[index] = current.toLowerCase());

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
      } else if(classes[args[1]]) {
        args[1] = classes[args[1]];
      } else {
        message.channel.send(usageMsgClass);
        return;
      }

      updateGear(message, args);
      // error checking
    } else {
      message.channel.send(usageMsg);
    }



  }
}
