const Discord = require('discord.js');
const { mongo } = require("../connect");
const { prefix } = require("../config.json");

module.exports = {
  name: 'help',
  execute (message, args) {

    const disp = new Discord.MessageEmbed()
    .setColor('#3498db')
    .setTitle(`To get started...`)
    .addField(`use the ${prefix}add command to add your gear to the SummerBot`, `${prefix}add <ap> <aap> <dp> <level> <Character> <Family> <class> (without brackets)`, false)
    .addField(`Available commands:`, `${prefix}add
${prefix}update
${prefix}list
${prefix}gear <@user>
${prefix}delete`)
    .setFooter(`Summerbot (beta) by Lreya`);



    const msg = `To get started, use the \`.add\` command to add your gear to the SummerBot
\`\`\`
Available commands:
.add
.update
.list
.gear @user
.delete
\`\`\``;

  message.channel.send(disp);

  }
}
