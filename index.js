const { Client, Collection, GatewayIntentBits, ActivityType, SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');
const { GiveawaysManager } = require('discord-giveaways');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions] });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

['commands', 'events', 'buttons', 'modals', 'selectMenus'].forEach((handler) => {
    require(`./src/handlers/${handler}`)(client);
});

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#FF0000',
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;

process.on('exit', code => { console.error(`=> Le processus s'est arrêté avec le code : ${code}`) });

process.on('uncaughtException', (err, origin) => { 
    console.error(`=> UNCAUGHT_EXCEPTION : ${err}`)
    console.error(`Origine : ${origin}`)
});

process.on('unhandledRejection', (reason, promise) => { 
    console.error(`=> UNHANDLE_REJECTION : ${{reason}}`)
    console.error(promise);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

    if (message.mentions.has(client.user.id)) {
        message.channel.send("> Je suis en `Slashs Commands` tapez </help:1079128642908586176> pour de l'aide.");
    }
});

client.on("guildCreate", () => {
    client.user.setActivity(`${client.guilds.cache.size} serveurs `, { type: ActivityType.Streaming, url: "https://twitch.tv/bras_ace" });
});

client.on("guildDelete", () => {
    client.user.setActivity(`${client.guilds.cache.size} serveurs `, { type: ActivityType.Streaming, url: "https://twitch.tv/bras_ace" });
});

client.on("ready", () => {
    client.user.setActivity(`${client.guilds.cache.size} serveurs `, { type: ActivityType.Streaming, url: "https://twitch.tv/bras_ace" });
});

process.on('warning', (...args) => { console.error(...args) });


client.login(process.env.TOKEN);
