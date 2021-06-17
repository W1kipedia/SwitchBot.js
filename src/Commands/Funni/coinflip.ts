import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'coinflip',
    public: true,
    description: 'Flip a coin!',
    aliases: [],
    example: 's.coinflip',
    run: async (client, msg, args) => {
        const choice = [
            'Heads!',
            'Tails'
        ];
        const outcome = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, ]

        msg.channel.send({
            content: outcome[Math.floor(Math.random() * outcome.length)] ? choice[Math.floor(Math.random() * choice.length)] : 'WOAH, the coin is balanced between heads and tails'
        })
    }
}
