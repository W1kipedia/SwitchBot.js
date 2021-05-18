import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'dm',
    description: 'anonymously private DM someone',
    aliases: [],
    run: async(client, msg, args) => {
        if (args.length < 2) return;
        const message = args.shift().toString().replace(/,/g, ' ');

    msg.channel.delete()
    .then(() => {
        msg.mentions.members.first().send(message)
        .then((messag) => {
            msg.channel.send("Done!")
            .then((m) => {
                m.delete({timeout: 4000});
            })
        })
        .catch((err) => {
            msg.channel.send("It seems like the person you're trying to DM has their DMs closed :c")
            .then((m) => {
                m.delete({timeout: 4000});
            })
            .catch((e) => {
                console.error(e);
            });
        });
    });

    }
}