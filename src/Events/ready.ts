import { Events } from '../Interfaces';

export const event: Events = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.tag} is online`);
        var e = true;
        setInterval(() => {
            if (e) {
                client.user.setPresence({status: 'online', activity: {name: "V1.0.0", type: "PLAYING"}});
                e = false;
            } else {
                client.user.setPresence({status: 'online', activity: {name: "Typescript > Vanilla Javascript", type: "PLAYING"}});
                e = true;
            }
        }, 6000)
    }
};