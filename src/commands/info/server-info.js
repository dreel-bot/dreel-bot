const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('❗ See informations about server'),
    async execute(interaction) {
    const embed = new EmbedBuilder() 
    .setColor(0x0099FF) 
    .setTitle("Dreel's Server Informations") 
    .addFields(
        {
            name: 'Owner :',
            value: `<:owner:1075129161682780190> <@${interaction.guild.ownerId}>`,
        },
        {
            name: "Created At :",
            value: `<:time:1075129168481763338> <t:${Math.floor(interaction.guild.createdAt / 1000)}>` 
        },
        {
            name: "Description :",
            value: `<:desc:1075133704558629026> ${interaction.guild.description || "Pas de description"}`
        },
        {
            name: "Boosts :",
            value: `<:boost:1075132024970559509> ${interaction.guild.premiumSubscriptionCount}`,
            inline: true
        },
        {
            name: "Boost Level :",
            value: `<:woboost:1075132024970559509> ${interaction.guild.premiumTier}`,
            inline: true
        },
        {
            name: "Verification Level :",
            value: `<:moderator:1075129156146315354> ${interaction.guild.verificationLevel}`,
            inline: true
        },
        {
            name: "Member :",
            value: `<:member:1075129153143185459> ${interaction.guild.memberCount.toString()}`,
            inline: true,
        },
        {
            name: "Roles :",
            value: `<:member:1075129153143185459> ${interaction.guild.roles.cache.size.toString()}`,
            inline: true,
        },
        {
            name: "Channels :",
            value: `<:channels:1075129148395237406> ${interaction.guild.channels.cache.size.toString()}`,
            inline: true,
        },
    )
    .setTimestamp()
    .setFooter({ text: 'Dreel'});
        await interaction.reply({embeds: [embed]} );
    },
};