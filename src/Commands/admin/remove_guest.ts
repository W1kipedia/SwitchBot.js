import { Command } from '../../Interfaces';
import { readFile } from 'fs/promises';

export const command: Command = {
    name: 'remove_guest',
    aliases: ['unguest', 'revoke_guest'],
    public: false,
    run: async (client, msg, args) => {
        if (!(msg.author.id === client.config.id.owner.toString())) return;
        
        readFile('/tmp/guest.txt', {encoding: 'utf-8'})
        .then((data) => {
            msg.guild.members.cache.forEach((member) => {
                if (member.id === data) {
                    const guest = member;
                    guest.roles.remove(data);
                    msg.channel.send(`${guest.user.username} is no longer a guest`)
                    .catch(err => {
                        throw new Error(err);
                    })
                }
            })
        })
        .catch((err) => {
            throw new Error(err);
        });

    }
}
