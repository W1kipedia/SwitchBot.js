import { Command } from '../../Interfaces';
import gTTS from 'gtts';
import { joinVoiceChannel, createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus } from '@discordjs/voice'

export const command: Command = {
    name: 'speak',
    description: "If you can't/don't want to speak you can use this command!",
    example: 's.speak [Message]',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        if (!msg.member.voice.channel) {msg.channel.send("you're not even in a channel lmao");return;}

        async function playAudio(quick?: boolean) {
            var conn = getVoiceConnection(msg.guild.id);
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause
                }
            })

            const tts = new gTTS(args.toString().replace(/,/g, ' '), 'en');
            tts.save('/tmp/audio.ogg', () => {
                // I prefer to save it in my temp folder but you
                // can choose whatever folder you want
                // example vvv
                // tts.save('../../../data/audio.mp3');
                
                // const resource = createAudioResource(createReadStream('/tmp/audio.ogg'));
                const resource = createAudioResource('/tmp/audio.ogg')
                player.play(resource);
                conn.subscribe(player);

                player.on(AudioPlayerStatus.Idle, () => {
                    if (quick) conn.destroy();
                })
                
                player.on('error', (err) => {
                    msg.channel.send(`There was an error while trying to play audio!\nError: ${err}`);
                    console.error(err);
                });
            });
        }

        if (msg.guild.members.cache.get(client.user.id).voice.channel) {
            if (msg.guild.members.cache.get(client.user.id).voice.channel.id === msg.member.voice.channel.id)  await playAudio();
            else {
                var memberCount: number = msg.guild.members.cache.get(client.user.id).voice.channel.members.size;

                msg.guild.members.cache.get(client.user.id).voice.channel.members.
                forEach((member) => {
                    if (member.user.bot) memberCount = memberCount - 1; 
                })
                if (memberCount === 0) { 
                    getVoiceConnection(msg.guild.id).destroy();
                    joinVoiceChannel({
                        channelId: msg.member.voice.channel.id,
                        guildId: msg.guild.id,
                        adapterCreator: msg.guild.voiceAdapterCreator
                    })
                    await playAudio();
                }
            }
        } else (!msg.guild.members.cache.get(client.user.id).voice.channel) ;{
            if (msg.member.voice.channel) {
                joinVoiceChannel({
                    channelId: msg.member.voice.channel.id,
                    guildId: msg.guild.id,
                    adapterCreator: msg.guild.voiceAdapterCreator
                });
                await playAudio();
            }
        }
    }
}
