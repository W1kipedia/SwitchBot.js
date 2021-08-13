import { Command } from '../../Interfaces';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice'

export const command: Command = {
    name: 'join',
    description: 'Make me join a voice call!',
    example: 's.join',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        if (msg.member.voice.channel) {
            if (!msg.guild.members.cache.get(client.user.id).voice.channel) {
                if (msg.member.voice.channel.type === 'GUILD_VOICE' && msg.member.voice.channel.joinable) {
                    joinVoiceChannel({
                        channelId: msg.member.voice.channel.id,
                        guildId: msg.guild.id,
                        adapterCreator: msg.guild.voiceAdapterCreator
                    })
                }
                msg.react('🤝')
                .catch((err) => {
                    console.error(err);
                })
            } else {
                const voiceChannel = msg.guild.members.cache.get(client.user.id).voice.channel
                if (voiceChannel.members.size > 1) msg.channel.send("I'm already in a voice channel with others :c");
                else {
                    getVoiceConnection(msg.guild.id).destroy();
                    msg.react('🤝')
                        .catch((err) => {
                            msg.channel.send(err);
                        });
                    joinVoiceChannel({
                        channelId: msg.member.voice.channel.id,
                        guildId: msg.guild.id,
                        adapterCreator: msg.guild.voiceAdapterCreator
                    })
                }
            }
        } else msg.channel.send("You must be in a voice channel to use this command!")
    }
}
