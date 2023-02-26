const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("❔ Display all commands"),
	async execute(interaction) {
        const embed = new EmbedBuilder() 
        .setColor(0x0099FF) 
        .setTitle("Dreel's Help") 
        .setThumbnail("https://cdn.discordapp.com/attachments/1075885376780107826/1079330591452958780/dreel_smale.png")
        .setDescription(`
**__Utils__ :**

> Avatar : Dispaly member avatar.

> Ping : Display latency.

> Server : See informations about server.

> Poll : Create a poll.

**__Informations__ :**

> Server-Info : See informations about server.

> Bot-Info : See informations about a user.

> User-Info :

**__Help__  :**

> Help ( you are here ) : Display all commands.

**__Modération__ :**

> Ban : Ban a user.

> Kick : Kick a user.

> Clear : Delete messages.`)
    .setTimestamp()
    .setFooter({ text: 'Dreel'});
        await interaction.reply({embeds: [embed]} );
    },
};