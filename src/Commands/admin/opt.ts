import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'opt',
    aliases: [],
    run: async (client, msg, args) => {
        if (msg.author.id === '547971853990494208') return;
        if (args.length === 0) {msg.channel.send('You must select whether to opt in or out!'); return;}

        switch (args[0].toLowerCase()) {
            case 'in':
                client.config.agreedToOpenUrl = true;
                msg.channel.send('Configured!')
                    .catch((err) => console.error(err));
                break;
            case 'out':
                client.config.agreedToOpenUrl = false;
                msg.channel.send('configured!')
                    .catch((err) => console.error(err));
                break;
            default: 
                msg.channel.send("unknown option!")
                    .catch((err) => console.error(err));
                break;
        }
    }
}