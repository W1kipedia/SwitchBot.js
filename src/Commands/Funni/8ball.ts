import { Command } from '../../Interfaces';

export const command: Command = {
    name: '8ball',
    description: 'It\'s just like shaking an eightball!',
    public: true,
    aliases: ['eightball', '8', 'eight_ball'],
    example: 's.8ball Will I ever get a life?',
    run: async (client, msg, args) => {
        if (args.length <= 0) return;

        const choices = ['It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes – definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'];
            msg.channel.send(`Question: \`${args.toString().replace(/,/g, ' ')}\`\nAnswer: \`${choices[Math.floor(Math.random() * choices.length)]}\``);
    }
}