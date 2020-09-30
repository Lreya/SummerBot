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
    .addField(`Available commands:`,
`${prefix}add
${prefix}addpic <link> OR image attachment
${prefix}update
${prefix}list
${prefix}gear <@user>
${prefix}delete
${prefix}info`)
    .setFooter(`Summerbot (beta) | report any bugs to Lreya#5771`, 'https://cdn.discordapp.com/attachments/342241086049091585/743570919200653352/summer1.png');

  message.channel.send(disp);

  }
}
