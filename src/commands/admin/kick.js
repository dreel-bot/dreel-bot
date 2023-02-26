const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("🚔 Kick a user")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("Select a user")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reaseon")
                .setDescription("Reason of the kick")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("user");
        const reason = options.getString("reason") || "No Reason";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Hu oh, you cant kick ${user.username} because his role is superior to you.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ 
                embeds: [errEmbed],
                ephemeral: true 
            });

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`${user} was kicked succesfuly ${reason}`)
            .setImage('https://cdn.discordapp.com/attachments/1075885376780107826/1077255515920404643/reglement.png')

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}