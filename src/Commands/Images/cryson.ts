import { Emoji, GuildEmoji, MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "cryson",
    example: 's.cryson',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "Stop using cryson" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.tenor.com/images/0000de7195a4d303add46b3928ee509f/tenor.gif');
        var joe = undefined;
        msg.guild.emojis.cache.forEach(emoji => {
            if (emoji.name === 'joe') joe = emoji;
        });
        if (typeof joe === 'undefined') joe = '🦧';

        await msg.channel.send(e)
        .then((m) => setTimeout(() => m.delete(), 3000))
        await msg.react(joe);
    }
}
