import { Events } from '../Interfaces';

export const event: Events = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.tag} is online`);
        // client.user.setActivity('the debugger', {type: "WATCHING"});
        client.user.setPresence({status: 'online', activity: {name: "with the debugger", type: "PLAYING"}});
    }
};