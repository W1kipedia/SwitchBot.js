import { Collection, MessageReaction, User } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'unban',
    description: 'Feel like you made a mistake? Unban someone!',
    aliases: [],
    run: async (client, msg, args) => {
        if (args.length === 0) return;
        if (!msg.member.permissions.has('BAN_MEMBERS')) return;

        const reason: string = args.length === 1 ? "No reason was provided" : args.shift().toString().replace(/,/g, ' ');

        const message = await msg.channel.send(`Are you sure you want to unban **${args[0]}**`);
        await message.react('👍');
        await message.react('👎');

        const filter = (reaction: MessageReaction, user: User) => { //filtering the reactions from the user
            return (
                ['👎', '👍'].includes(reaction.emoji.name) && user.id === msg.author.id
            );
        }

        message.awaitReactions(filter, { idle: 10000, max: 1, errors: ['time'] })
            .then(async (collected) => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    msg.guild.fetchBans()
                    .then((bans) => {
                        bans.forEach((ban) => {
                            if (ban.user.tag === args[0]) msg.guild.members.unban(ban.user, reason);
                        });
                    })
                    .catch((err) => {
                        msg.channel.send("Person was not found! :c");
                    });
                    await msg.channel.send(`Successfully unbanned ${args[0]}`);
                } else {
                    await message.delete();
                    await msg.delete();
                    msg.channel.send("Ok then..")
                        .then((messag) => messag.delete({ timeout: 2000 }));
                }

            })
            .catch((collected: Collection<string, MessageReaction>) => {
                message.delete();
                msg.channel.send("You took too long!")
                    .then((m) => m.delete({ timeout: 3000 }));
            });

    }
}