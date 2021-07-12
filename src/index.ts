import Client from './Client';

const e = new Client({
    intents: [
        "GUILD_MESSAGES"
    ]
});e.init();
