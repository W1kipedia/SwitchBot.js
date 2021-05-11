import { Intents } from 'discord.js';
import Client from './Client';

const intents = new Intents(Intents.ALL)
const e = new Client({
    ws: {
        intents: intents
    }
});e.init();