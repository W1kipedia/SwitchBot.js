import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'dm',
    description: 'anonymously private DM someone',
    example: 's.dm @AnnoyMe [Message]',
    public: false,
    aliases: [],
    run: async(client, msg, args) => {
        msg.channel.send("This command is no longer available, use the slash command /direct_message instead!")
    }
}
