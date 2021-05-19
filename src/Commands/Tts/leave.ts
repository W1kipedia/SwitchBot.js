import { Emoji } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'leave',
    description: 'Make me leave a voice call',
    aliases: ['die', 'goaway', 'go_away', 'death'],
    run: async (client, msg, args) => {
        if (!msg.member.voice.channel) {
            client.voice.connections.array().
                forEach(async (channel) => {
                    if (channel.channel.guild.id === msg.guild.id) {
                        if (channel.channel.members.array().length >= 0) {
                            channel.disconnect();
                        }
                    }
                });
        } else {
            client.voice.connections.array().
                forEach(async (channel) => {
                    if (channel.channel.guild.id === msg.guild.id) {
                        if (channel.channel.members.array().length >= 0||
                        channel.channel.members.has(msg.author.id)) {
                            channel.disconnect();
                            msg.react('844424386408087562')
                            .then(() => {
                                console.log("I have added reaction :D");
                            })
                            .catch(() => {
                                msg.channel.send("it seems I cannot react to your message for some reason, weird.")
                            })
                        }
                    }
                });
        }
    }
}