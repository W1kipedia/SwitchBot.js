import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'owo',
    description: 'owoify any text',
    example: 's.owo This Text is owoified!',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        if (args.length === 0) return;

        const message: string = args.toString().replace(/,/g, ' ');
        var output: string = "";

        for (let i = 0; i < message.length; i++) {
            switch (message.charAt(i).toLowerCase()) {

                case 'o':
                    output = output + 'OwO';
                    break;

                case 'u':
                    output = output + 'UwU'
                    break;

                default:
                    output = output + message.charAt(i);
                    break;
            }
        }

        msg.channel.send(`Text: \`${message}\`\nTranslated: \`${output}\``)
        .catch((err) => {
            console.error(err);
        });

    }
}