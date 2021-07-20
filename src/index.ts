import Client from './Client';

const e = new Client({
    intents: [
        'GUILDS',
        'GUILD_PRESENCES',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_BANS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES',
        'GUILD_INTEGRATIONS'
    ]
});e.init();
