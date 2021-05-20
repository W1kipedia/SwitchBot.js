import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'gambling',
    description: 'The gambling menu to fill the deep gambling addiction',
    aliases: ['gamble'],
    run: async (client, msg, args) => {
        const embed = new MessageEmbed({
            title: 'Gambling menu',
            description: 'The gambling menu to fill the deep gambling addiction',
            fields: [
                { name: '1️⃣gambleflip', value: '**it\'s like coinflipping but gambling**' },
                { name: '2️⃣rob', value: '**you can take money away from someone! There\'s a risk though!**' }
            ],
            footer: {
                text: `Command by ${msg.author.username}`,
                icon_url: msg.author.avatarURL()
            }
        })
        msg.channel.send({ embed: embed })
        .catch((err) => {
            console.error(err);
        });
    }
}