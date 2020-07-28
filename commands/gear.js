const Discord = require('discord.js');
const { mongo } = require("../connect");
const { prefix } = require("../config.json");

async function gear(message, args) {
  try{
    const guild = message.guild.id;
    const db = mongo.db('summerbot');
    const col = db.collection(guild);

    const taggedUser = message.mentions.users.first();

    let target = message.author.id;
    let av = message.author.avatarURL();
    if(taggedUser)
    {
      target = taggedUser.id;
      av = taggedUser.avatarURL();
      // check if other user is tagged and set target = to the other user.
    }

    const p = await col.findOne({discordID: target});

    if(p === null) {
      message.channel.send(`Please add your gear first using ${prefix}add command.`);
      return;
    }

    const disp = new Discord.MessageEmbed()
    .setTitle(`${p.family} (${p.character})`)
    .setThumbnail(av)
    .setColor('#e67e22')
    .addField('Class', p.class, false)
    .addField('Level', p.level, false)
    .addField('AP', p.ap, true)
    .addField('AAP', p.aap, true)
    .addField('DP', p.dp, true)
    .addField('Gearscore', p.gearscore, false)
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
