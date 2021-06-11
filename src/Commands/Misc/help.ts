import { MessageEmbed } from 'discord.js';
// import { readdir } from 'fs/promises';
// import path from 'path';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'help',
    example: 's.help',
    description: 'Get a list of all commands!',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        // const CommandPath = path.join(__dirname, '..', '..', "Commands");
        // readdir(CommandPath)
        //     .then((p) => {
        //         p.forEach((dir) => {

        //         });
        //     })
        //     .catch((err) => { })
        const em = new MessageEmbed({
            title: 'Help menu',
            color: 3447003,
            fields: [
                {
                    name: '**Economy**',
                    value: '`balance` `beg` `deposit` `give` `withdraw`'
                },
                {
                    name: '**Funni**',
                    value: '`coinflip`, `open_url`, `owo`'
                },
                {
                    name: '**Gambling**',
                    value: '`gambleflip` `rob`'
                },
                {
                    name: '**Images**',
                    value: '`alex` `bingus` `candice` `cole` `cryson` `derp` `joe` `joey`'
                },
                {
                    name: '**Misc**',
                    value: '`help` `ping`'
                },
                {
                    name: '**Moderation**',
                    value: '`ban` `delete` `dm` `kick` `mute` `unban` `unmute`'
                },
                {
                    name: '**Tts**',
                    value: '`join` `leave` `speak`'
                },
                {
                    name: '**Wikipedia**',
                    value: '`wikipedia_search` `wikipedia_summary`'
                }
            ],
            footer: { text: 'https://github.com/W1kipedia/SwitchBot.js' }
        });
        msg.channel.send({embed: em})
            .catch(err => console.error(err));
    }
}
