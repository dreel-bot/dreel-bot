const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display an avatar')
        .addUserOption(option => 
            option.setName("user")
            .setDescription("User to display avatar")
            .setRequired(false)),
    async execute(interaction) {
        if(interaction.commandName === "avatar"){
            let user = interaction.options.getUser("user")
            if(user != undefined){
            const avatars = new EmbedBuilder()
    .setTitle("Dreel's Avatar")
    .setColor('#0099ff')
    
    .setFooter({ text: 'Dreel'})
    .setDescription(`Avatar of : ${interaction.user.tag}`)
    .setImage(user.displayAvatarURL({dynamic: true}))
    .setTimestamp()

interaction.reply({ embeds: [avatars]}),{}
            }else {
                const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // .setCustomId('link')
                    .setLabel(`link to avatar of [${interaction.user.tag}]`)
                    .setStyle(ButtonStyle.Link)
                    .setURL(interaction.user.displayAvatarURL({dynamic: true})),
            );
                const avatard = new EmbedBuilder()
    .setTitle("Dreel's Avatar")
    .setColor('#0099ff')
    
    .setDescription('You avatar :')
    .setImage(interaction.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({ text: 'Dreel'});

interaction.reply({ embeds: [avatard], components: [row] });

            }
    }
}}