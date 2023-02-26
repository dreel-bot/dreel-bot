const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("🤝 Create a poll")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Descibe poll")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Select a channel")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("channel");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setAuthor(`Dreel's Poll`)
            .setDescription(description)
            .setTimestamp()
            .setFooter({ text: '🎮・Fatality Bot\'s'});

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("✅");
            await m.react("❌");
            await interaction.reply({ content: "Sondage created succesfuly", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}