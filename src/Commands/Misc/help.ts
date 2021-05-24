import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'help',
    description: 'currently a placeholder!',
    aliases: [],
    run: async (client, msg, args) => {
        msg.channel.send("Currently in development!")
            .catch(err => console.error(err));
    }
}