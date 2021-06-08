import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'bingus',
    description: 'bingus moment',
    aliases: [],
    public: true,
    example: 's.bingus',
    run: async (clinet, msg, args) => {
        msg.channel.send("please refer to this message https://discord.com/channels/643082091961122816/698319190062530570/821778116857954355")
            .catch(err => console.error(err));
    }
}
