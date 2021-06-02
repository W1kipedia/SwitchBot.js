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
            'Tails!',
            'I dropped the coin. Flip the coin again!'
        ];

        msg.channel.send(choice[Math.floor(Math.random() * choice.length)])
    }
}