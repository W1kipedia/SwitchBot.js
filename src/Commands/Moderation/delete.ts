import { TextChannel } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    "name": "delete",
    "description": "Delete an amount of messages from a channel",
    example: 's.delete 69',
    public: true,
    "aliases": ["del", "purge"],
    run: async (client, msg, args) => {
        if (args.length === 0) {const amount: number = 2};
        if (!msg.member.permissions.has('MANAGE_MESSAGES')) return;

        const amount: number = parseInt((args[0] as string));
        if (!(typeof amount === 'number')) return;
        
        if (msg.guild.member(msg.author).hasPermission('MANAGE_MESSAGES')) {

            if (msg.channel.type === 'text') msg.channel.bulkDelete(amount);

        } else {
            msg.channel.send("❌ You don't have permissions. ❌");
        }

    }
}