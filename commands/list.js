const Discord = require('discord.js');
const { mongo } = require("../connect");

async function listGear (message, args) {
  try{
    const db = mongo.db('summerbot');
    const col = db.collection('geardb');

    const c = db.collection('geardb').find({}).sort({gearscore:-1});

    let i = 0;
    let listMsg = `#  Family  Character  AP   AAP  DP   GS   Class  Level  Updated
-  ------  ---------  ---  ---  ---  ---  -----  -----  -------`;
    message.channel.send(`\`\`\`${listMsg}\`\`\``);


    c.each(function(err, doc) {
      console.log(i);

      if(doc)
      {
        i++;
        console.log(doc);
      } else {
        // console.log('the last one is null.');
      }

      if(i == 10){

        // send msg

        // reset i = 0;

        // clear msg
      }
    });


    // console.log(c);

  } catch (err) {
  } finally {

  }
}

module.exports = {
  name: 'list',
  description: 'lists all gear registered with the bot in the server.',
  execute (message, args) {
    listGear(message, args);
  }
}
