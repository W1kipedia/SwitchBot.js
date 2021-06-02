import { Events, Command } from '../Interfaces'
import { GuildEmoji, Message } from 'discord.js';
import { readFile, unlink } from 'fs/promises';

export const event: Events = {
    name: 'message',
    run: async (client, msg: Message) => {
        if (!msg.guild) return; 
        if (msg.content.toLowerCase().startsWith('<@!752666067536576512>')) msg.channel.send('Use `s.help` to see all the commands!').catch(err => console.error(err));
        if (msg.channel.id === '738155429342871623') {
            var yes: GuildEmoji | string = '👍';
            var no: GuildEmoji | string = '👎';
            var think: GuildEmoji | string = '🤔';
            msg.guild.emojis.cache.forEach((emote) => {
                switch (emote.id) {
                    case '849525435066482720':
                        yes = emote;
                        break;
                    case '849525435066482720':
                        no = emote;
                        break;
                    case '849525435066482720':
                        think = emote;
                        break;
                }
            });
            if (msg.author.id === '547971853990494208') {
                msg.react(yes)
                    .then(() => {
                        msg.react(no)
                            .then(() => {
                                msg.react(think)
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
            } else {
                readFile('/tmp/guest.txt', {encoding: 'utf-8'})
                .then((data) => {
                    msg.guild.members.cache.forEach((member) => {
                        if (member.id === data) {
                            msg.react(yes)
                                .then(() => {
                                    msg.react(no)
                                        .then(() => {
                                            msg.react(think)
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