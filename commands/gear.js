const Discord = require('discord.js');
const { mongo } = require("../connect");
const { prefix } = require("../config.json");

async function gear(message, args) {
  try{
    const db = mongo.db('summerbot');
    const col = db.collection('geardb');

    const taggedUser = message.mentions.users.first();

    let target = message.author.id;
    if(taggedUser)
    {
      target = taggedUser.id;
      // check if other user is tagged and set target = to the other user.
    }

    const p = await col.findOne({discordID: target});

    console.log(message.author.id);

    if(p === null) {
      message.channel.send(`Please add your gear first using ${prefix}add command.`);
      return;
    }
    const av = message.author.avatarURL();
    let gs;

    p.ap >= p.aap ? gs = p.ap + p.dp : gs = p.aap + p.dp;

    const disp = new Discord.MessageEmbed()
    .setTitle(`${p.family} (${p.character})`)
    .setThumbnail(av)
    .setColor('#e67e22')
    .addField('Class', p.class, false)
    .addField('Level', p.level, false)
    .addField('AP', p.ap, true)
    .addField('AAP', p.aap, true)
    .addField('DP', p.dp, true)
    .addField('Gearscore', gs, false)
    .setImage('https://media.discordapp.net/attachments/412513029343805442/715770837432664074/worryNo.gif')
    .setFooter(`last updated at ${p.lastUpdated}.`);

    message.channel.send(disp);

  } catch(err) {
    console.log(err.stack);
    message.channel.send('Unsuccessful');
  } finally {
  }
}

module.exports = {
  name: 'gear',
  description: 'displays your gear',
  execute (message, args) {

    gear(message, args);
    // console.log(x.id);
  }
}
