import { getVoiceConnection } from '@discordjs/voice'
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'leave',
    description: 'Make me leave a voice call',
    example: 's.leave',
    public: true,
    aliases: ['die', 'goaway', 'go_away', 'death'],
    run: async (client, msg, args) => {
        try {
            getVoiceConnection(msg.guild.id).destroy();
            msg.react('👋')
                .catch((err) => {
                    console.log(err);
                })
        } catch {
            msg.channel.send("had an error while trying to get the channel. Try using `s.join` and then use this command again?")
            .then((msg_) => {
                setTimeout(() => msg_.delete(), 5000);
            });
        }
    }
}
