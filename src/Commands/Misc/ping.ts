import { Message } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "ping",
    description: "Simple ping command!",
    example: 's.ping',
    public: true,
    aliases: ['delay'],
    run: async(client, msg, args) => {

        const m : Message = await msg.channel.send('Calculating ping... ⚙️');

        setTimeout(() => m.edit("what, you think I'm in the mood to calculate the ping? No, cry about it."), 5000)
    }
}