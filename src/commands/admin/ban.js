const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("🚔 Ban a user")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to ban")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason of the ban")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("user");
        const reason = options.getString("reason") || "No Reason";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Hu ho, you cant ban ${user.username} because his role is superior to you.`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setAuthor(`Dreel's Ban`)
            .setDescription(`${user} was banned succesfuly with reason : **${reason}**`)
            .setImage('https://cdn.discordapp.com/attachments/1075885376780107826/1077255515920404643/reglement.png')
            .setColor(0x5fb041)
            .setTimestamp()
            .setFooter({ text: 'Dreel'});

        await interaction.reply({
            embeds: [embed]
        });
    }
}