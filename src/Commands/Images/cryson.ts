import { Emoji, GuildEmoji, MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "cryson",
    example: 's.cryson',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed();
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media1.tenor.com/images/61e127273f4ce7c6cefcdfa07183f0a0/tenor.gif');

        msg.channel.send({ embed: e })
    }
}
