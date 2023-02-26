const { ApplicationCommandOptionType, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { execute } = require('./info');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("❗ See informations about a user")
    .addUserOption(option => 
        option.setName("membre")
        .setDescription("Utilisateur que vous souhaitez mentionner")
        .setRequired(false)),
    async execute(interaction) {
        if(interaction.commandName === "user-info"){
            const member = interaction.options.getMember("membre") || interaction.member;
            const embed = new EmbedBuilder()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
            .addFields(
                {
                    name: 'Member :',
			        value: `<:member:1075129153143185459> ${member.toString()}`,
                    inline: true
                },
                {
                    name: "Member Id :",
                    value: `<:member:1075129153143185459> ${member.id.toString()}`,
                    inline: true
                },
                {
                    name: "Boost Since :",
                    value: member.premiumSinceTimestamp ? `<:woboost:1075132024970559509> <t:${(Math.floor(member.premiumSinceTimestamp / 1000))}:R>` : `<:woboost:1075132024970559509> Ne boost pas le serveur`,
                    inline: false
                },
                {
                    name: "Joined At :",
                    value: `<:time:1075129168481763338> <t:${Math.floor(member.joinedAt / 1000)}:R>`,
                    inline: true
                },
            )
            .setColor('#0099ff')
            .setFooter({ text: 'Dreel'})
            .setTimestamp()
            interaction.reply({ embeds: [embed]}),{}
        }
    }
}