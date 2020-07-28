const Discord = require('discord.js');
const { mongo } = require("../connect");

async function deleteGear (message, args) {
  try{
    const guild = message.guild.id;
    const db = mongo.db('summerbot');
    const col = db.collection(guild);

    const del = await col.deleteOne({discordID: message.author.id});
    if(del.deletedCount > 0) {
      message.channel.send('Successfully deleted');
    }


  } catch (err) {
    message.channel.send('Failed to delete');
  } finally {

  }
}

module.exports = {
  name: 'delete',
  description: 'delete your gear from the gearbot',
  execute (message, args) {
    deleteGear(message, args);
  }
}
