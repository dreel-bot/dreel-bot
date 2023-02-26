const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("🤝 Display ping"),
	async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Dreel's Ping`)
    .addFields(
        { name: 'Ping :', value: `<:online:1075129159845687376> Latency : ${sent.createdTimestamp - interaction.createdTimestamp}ms` },
    )
    .setTimestamp()
    .setFooter({ text: 'Dreel'});

    await interaction.editReply({ content: " ", embeds: [exampleEmbed]});
	},
};