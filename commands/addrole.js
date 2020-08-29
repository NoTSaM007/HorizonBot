const checkPermissionRole = role =>
  role.permissions.has("ADMINISTRATOR") ||
  role.permissions.has("KICK_MEMBERS") ||
  role.permissions.has("BAN_MEMBERS") ||
  role.permissions.has("MANAGE_GUILD") ||
  role.permissions.has("MANAGE_CHANNELS");

module.exports = {
  name: "addrole",
  category: "Moderation",
  description: "Add Role To A User.",
  usage: "addrole <@user> <@role>",
  execute: async (client, message, args) => {
    let roleNames = args.split(", ");
    let roleSet = new Set(roleNames);
    let { cache } = message.guild.roles;
    roleSet.forEach(roleName => {
      let role = cache.find(
        role => role.name.toLowerCase() === roleName.toLowerCase()
      );
      if (role) {
        if (message.member.roles.cache.has(role.id)) {
          message.channel.send("You already have this role!");
          return;
        }
        if (checkPermissionRole(role)) {
          message.channel.send("You cannot add yourself to this role.");
        } else {
          message.member.roles
            .add(role)
            .then(member =>
              message.channel.send("You were added to this role!")
            )
            .catch(err => {
              console.log(err);
              message.channel.send("Something went wrong...");
            });
        }
      } else {
        message.channel.send("Role not found!");
      }
    });
  }
};
