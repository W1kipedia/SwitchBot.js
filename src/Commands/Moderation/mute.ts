import { GuildMember, MessageReaction, Role, User } from 'discord.js';
import { createConnection } from 'mysql';
import { Command } from '../../Interfaces'

export const command: Command = {
    "name": "mute",
    "description": "Mute someone!",
    "aliases": [],
    run: async (client, msg, args) => {
        if (args.length === 0 || args.length >= 3) return;

        const member: GuildMember = await msg.guild.members.fetch(msg.mentions.users.first().id);
        var reason: String = args[1];

        if (typeof reason !== 'string') reason = 'No Resson Was Provided';
        if (typeof member !== 'object') return;

        const message = await msg.channel.send(`Are you sure you want to mute **${member.user.tag}**`);
        await message.react('👍');
        await message.react('👎');

        const check = (reaction: MessageReaction, user:User) => (reaction.emoji.name === '👍'||reaction.emoji.name === '👎')
        && user.id === msg.author.id;

        message.awaitReactions(check, {time: 10000})
        .then(async (collected) => {
            const reaction = collected.first();

            if (reaction.emoji.name === '👍') {
                message.delete();
                const MutedRole = await msg.guild.roles.fetch('696463147934154816');
                const MemberRole = await msg.guild.roles.fetch('643121101035012126');
                    
                const db = createConnection(client.config.dbAll);

                db.connect(async (err) => {
                    if (err) throw err;

                    const query = `SELECT has_custom_role, custom_role_id FROM Boosters WHERE client_id = ${member.id}`;

                    db.query(query, async (err, result:any[]) => {
                        if (err) throw err;

                        if (result.length === 1) {
                            if (result[0].has_custom_role) {
                                const customRole = await msg.guild.roles.fetch(result[0].custom_role_id)
                                member.roles.remove(customRole);
                            }
                        };

                    });
                    db.destroy();
                });

                member.roles.add(MutedRole);
                member.roles.remove(MemberRole);

            } else {
                message.delete();
                msg.delete();
                msg.channel.send("Ah, alright.")
                .then((messag) => messag.delete({timeout: 2000}));
            }
        })

    }
}