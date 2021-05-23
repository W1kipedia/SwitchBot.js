import { Events, Command } from '../Interfaces'
import { Message } from 'discord.js';
import { readFile, unlink } from 'fs/promises';

export const event: Events = {
    name: 'message',
    run: async (client, msg: Message) => {
        if (!msg.guild) return; 
        if (msg.channel.id === '738155429342871623') {
            if (msg.author.id === client.config.id.owner.toString()) {
                msg.react('👍')
                    .then(() => {
                        msg.react('👎')
                            .then(() => {
                                msg.react("🤔")
                                    .catch((err) => {
                                        console.error(err);
                                    })
                            })
                            .catch((err) => {
                                console.error(err);
                            })
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }
            readFile('/tmp/guest.txt', {encoding: 'utf-8'})
            .then((data) => {
                msg.guild.members.cache.forEach((member) => {
                    if (member.id === data) {
                        msg.react('👍')
                            .then(() => {
                                msg.react('👎')
                                    .then(() => {
                                        msg.react("🤔")
                                            .catch((err) => {
                                                console.error(err);
                                            })
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                    })
                            })
                            .catch((err) => {
                                console.error(err);
                            })
                        member.roles.remove(client.config.id.guestRole.toString())
                            .then(() => {
                                console.log(`${member.user.username} is no longer a guest`);
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    }
                })
            })
            .then(() => {
                unlink('/tmp/guest.txt')
                    .then(() => {
                        console.log("successfully delete /tmp/guest.txt");
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            })
            .catch(async (err) => {
                await msg.delete();
                console.error(err);
            })
        }
        if (!msg.content.toLocaleLowerCase().startsWith(client.config.prefix))  return;
        
        const args = msg.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.shift().toLocaleLowerCase();
        if(!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as Command).run(client, msg, args);
    }
}