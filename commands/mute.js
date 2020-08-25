const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "Moderation",
  usage: "mute <@mention> <reason>",
  execute: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      let embed = new MessageEmbed()
        .setColor("00ffff")
        .setDescription(
          "Missing Perms, Make Sure You Have The `MANAGE ROLES` Perm."
        );
      message.channel.send(embed);
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      let embed = new MessageEmbed()
        .setColor("070707")
        .setDescription("Make Sure I Have Perms To Manage Roles.");
      message.channel.send(embed);
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to mute"
      );
    }

    if (user.id === message.author.id) {
      return message.channel.send("I won't mute you -_-");
    }

    let reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send("Please Give the reason to mute the member");
    }

    //TIME TO LET MUTED ROLE

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (!muterole) {
      return message.channel.send(
        "This server do not have role with name `Muted`"
      );
    }

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Given User is already muted");
    }

    user.roles.add(muterole);

    let embed = new MessageEmbed()
      .setColor("070707")
      .setDescription(
        `**${
          message.mentions.users.first().username
        }** Wᴀs Mᴜᴛᴇᴅ |  \`${reason}\``
      );
    message.channel.send(embed);

    user.send(`You are muted in **${message.guild.name}** For \`${reason}\``);

    //WE ARE DONE HERE
  }
};
