import { Command } from '../../Interfaces';
import  * as open from 'open';

export const command: Command = {
    name: 'open_url',
    description: 'Open a url on Wiki\'s computer!',
    aliases: [],
    run: async (client, msg, args) => {
        if (args.length === 0||args.length > 1) return;

        const prompt = args.toString().replace(/,/g, ' ');

        open(prompt);
        msg.channel.send(`Opening \`${prompt}\``)
        .then((m) => {
            console.log(`Opening url ${prompt}`);
        })
        .catch((err) => {
            console.error(err);
        });

    }
}