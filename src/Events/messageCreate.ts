import { Events, Command } from '../Interfaces'
import { GuildEmoji, Message } from 'discord.js';
import path from 'path';
import { readFile, unlink } from 'fs/promises';

export const event: Events = {
    name: 'messageCreate',
    run: async (client, msg: Message) => {
        if (!msg.guild) return; 
        if (msg.author.bot) return;
        if (msg.content.toLowerCase() === 'avocados 🥑 from mexico 🇲🇽') {
            msg.react('🥑')
            .then(() => {
                msg.react('🇲🇽')
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
        if (msg.content.toLowerCase().startsWith('<@!752666067536576512>')) msg.channel.send('Use `s.help` to see all the commands!').catch(err => console.error(err));
        /*msg.content.split(' ').forEach((word) => {
            // inside of /data/profanity.txt you list a word to be censored by creating a word per line
            const FilePath = path.join(__dirname, '..', '..', 'data');
            readFile(`${FilePath}/profanity.txt`, 'utf8')
                .then((data) => {
                    data.split('\n').forEach((CensoredWord) => {
                        const re = new RegExp(CensoredWord, 'g');
                        
                        if (re.test(word.toLowerCase())) {
                            msg.delete()
                                .catch(err => console.error(err))
                            return;
                        }
                    });
                })
                .catch(err => console.error(err));
        });*/
        if (msg.channel.id === '738155429342871623') {
            var yes: GuildEmoji | string = '👍';
            var no: GuildEmoji | string = '👎';
            var think: GuildEmoji | string = '🤔';
            msg.guild.emojis.cache.forEach((emote) => {
                switch (emote.name) {
                    case 'yes':
                        yes = emote;
                        break;
                    case 'no':
                        no = emote;
                        break;
                    case 'thronking':
                        think = emote;
                        break;
                }
            });
            if (msg.author.id === client.config.id.owner.toString()) {
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
                    if (msg.author.id === data) {
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
                        msg.member.roles.remove(client.config.id.guestRole.toString())
                            .then(() => {
                                console.log(`${msg.author.username} is no longer a guest`);
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    }
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

        const cmd = args.shift().toLowerCase();
        if(!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as Command).run(client, msg, args);
    }
}
