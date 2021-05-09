import { Events, Command } from '../Interfaces'
import { Message } from 'discord.js';

export const event: Events = {
    name: 'message',
    run: (client, msg: Message) => {
        if (!msg.guild || !msg.content.toLocaleLowerCase().startsWith(client.config.prefix))
        return;
        
        const args = msg.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.shift().toLocaleLowerCase();
        if(!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as Command).run(client, msg, args);
    }
}