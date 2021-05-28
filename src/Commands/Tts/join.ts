import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'join',
    description: 'Make me join a voice call!',
    example: 's.join',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {

        if (msg.member.voice.channel) {
            if (!msg.guild.member(client.user).voice.channel) {
                await msg.member.voice.channel.join();
                msg.react('🤝')
                .catch((err) => {
                    console.error(err);
                })
            } else {
                client.voice.connections.array().
                forEach(async (channel) => {
                    if (channel.channel.guild.id === msg.guild.id) {
                        if (channel.channel.members.array().length > 1) msg.channel.send("I'm already in a voice channel with others :c");
                        else {
                            channel.disconnect();
                            msg.react('🤝')
                               .catch((err) => {
                                    msg.channel.send(err);
                                });
                            await msg.member.voice.channel.join()
                            .catch(async err => {
                                msg.channel.send("it seems I have ran into a problem while joining, mind trying the command again?");
                                msg.react('❌')
                                .catch((err) => {
                                    msg.channel.send(err);
                                });
                                console.error(err);
                            });
                        }
                    }
                });
            }
        } else msg.channel.send("You must be in a voice channel to use this command!")
    }
}