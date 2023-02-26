const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bot-info")
		.setDescription("❗ Display bot info")
        .setDMPermission(true),
	async execute(interaction) {
        const botUser = interaction.client.user;
        let isTeamOwner = false;
        let owner = "Aucun";
        await interaction.client.application.fetch().then(function(bot) {
            if (bot.owner.tag !== undefined) {
                owner = `▸ ${bot.owner.tag}`
            } else {
                isTeamOwner = true;
                owner = "";
                bot.owner.members.forEach(member => {
                    owner += `・ ${member.user.tag}\n`;
                });
            }
        });

        const embed = new EmbedBuilder()
            .setTitle('About Bot :')
            .setAuthor({ name: botUser.username, iconURL: botUser.displayAvatarURL() })
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { 
                    name: `<:time:1075129168481763338> Creation Date :`,
                    value: `<t:${parseInt(botUser.createdTimestamp / 1000)}:D>`,
                    inline: true 
                },
                { 
                    name: `<:online:1075129159845687376> Online Since :`, 
                    value: `<t:${parseInt(interaction.client.readyTimestamp / 1000)}:R>`, 
                    inline: true 
                },
                { 
                    name: `${isTeamOwner ? `<:owner:1075129161682780190> My Owners` : `<:owner:1075129161682780190> My Owner`}`, 
                    value: owner, 
                    inline: true 
                },
                {   
                    name: `<:dev:1075767105464586270> My Developer :`, 
                    value: `・ [Wodd#0001](https://github.com/wodd-lca)`, 
                    inline: true 
                },
            )
            .setColor('DarkAqua')
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ content: null, embeds: [embed] });
	},
};
