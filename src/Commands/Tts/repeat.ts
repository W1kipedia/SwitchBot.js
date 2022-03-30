import { Command } from '../../Interfaces';
import gTTS from 'gtts';
import { stat } from 'fs';
import { joinVoiceChannel, createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';

export const command: Command = {
	name: 'repeat',
	description: "Repeat the last message said with Text To Speech",
	example: 's.repeat',
	public: true,
	aliases: [],
	run: async (client, msg) => {
		if (!msg.member.voice.channel) {msg.channel.send("you're not even in a channel lmao");return;}
		stat('/tmp/audio.ogg', async (err) => {
			if (err.code === "ENOENT") {
				msg.channel.send("no previous message was found! D:")
				.catch(err => console.error(err));
				return;
			};
			async function playAudio(quick?: boolean) {
				var conn = getVoiceConnection(msg.guild.id);
				const player = createAudioPlayer({
					behaviors: {
						noSubscriber: NoSubscriberBehavior.Pause
					}
				})

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
			}

			if (msg.guild.members.cache.get(client.user.id).voice.channel) {
				if (msg.guild.members.cache.get(client.user.id).voice.channel.id === msg.member.voice.channel.id) await playAudio();
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
			} else (!msg.guild.members.cache.get(client.user.id).voice.channel); {
				if (msg.member.voice.channel) {
					joinVoiceChannel({
						channelId: msg.member.voice.channel.id,
						guildId: msg.guild.id,
						adapterCreator: msg.guild.voiceAdapterCreator
					});
					await playAudio();
				}
			}
		})
	}
}
