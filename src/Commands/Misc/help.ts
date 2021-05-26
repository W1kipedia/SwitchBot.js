import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'help',
    aliases: [],
    run: async (client, msg, args) => {
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
                    value: '`open_url`, `owo`'
                },
                {
                    name: '**Gambling**',
                    value: '`gambleflip` `rob`'
                },
                {
                    name: '**Images**',
                    value: '`alex` `candice` `cole` `cryson` `derp` `joe` `joey`'
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
            ]
        });
        em.setFooter(`Command by ${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send('', { embed: em })
            .catch(err => console.error(err));
    }
}