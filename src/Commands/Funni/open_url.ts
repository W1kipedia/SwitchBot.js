import { Command } from '../../Interfaces';
import open from 'open';

export const command: Command = {
    name: 'open_url',
    description: 'Open a url on Wiki\'s computer!',
    public: true,
    example: 's.open_url https://github.com/W1kipedia/SwitchBot.js',
    aliases: [],
    run: async (client, msg, args) => {
        if (args.length === 0||args.length > 1) return;
        if (!client.tempConfig.agreedToOpenUrl) {msg.channel.send("The owner has opted out of this option!"); return;}
        client.cooldowns.open_url.forEach((id:string) => {
            if (id === msg.author.id) {
                msg.channel.send(`You're still on cooldown for ${(client.cooldowns.open_url[msg.author.id.toString()]) / (1000*60)} minutes!`)
            }
        })

        const prompt = args.toString().replace(/,/g, ' ');

        open(prompt);
        msg.channel.send(`Opening \`${prompt}\``)
        .then((m) => {
            console.log(`Opening url ${prompt}`);
        })
        .then(() => {
            client.cooldowns.open_url.push(msg.author.id);
            setTimeout(() => {
                const location = client.cooldowns.open_url.indexOf(msg.author.id);
                if (location > -1) {
                    client.cooldowns.open_url.splice(location, 1);
                }
            }, 7200000);
        })
        .catch((err) => {
            console.error(err);
        });

    }
}