const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("🚔 Delete messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addNumberOption(option =>
        option.setName('amount')
        .setDescription('Number')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Select a user for delete his messages.')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('amount');
        const target = options.getUser("user");

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Message of ${target} deleted succesfuly`);
                    interaction.reply({embeds: [res],
                    ephemeral: true
                });
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`${messages.size} messages was deleted succesfuly.`);
                interaction.reply({
                    embeds: [res],
                    ephemeral: true
                });
            });
        }
    }
}