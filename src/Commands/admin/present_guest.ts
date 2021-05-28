import { Command } from '../../Interfaces';
import { writeFile } from 'fs/promises';
import { GuildMember } from 'discord.js';

export const command: Command = {
    name: 'present_guest',
    aliases: ['guest', 'add_guest'],
    public: false,
    run: async (client, msg, args) => {
        if (!(msg.author.id === client.config.id.owner.toString())) return;
        if (args.length === 0) {msg.channel.send("You must mention someone to add them as a guest!"); return;};
        const guest: GuildMember = msg.mentions.members.first();
        const guestRole = await msg.guild.roles.fetch(client.config.id.guestRole.toString())
        
        writeFile("/tmp/guest.txt", guest.id)
        .then(() => {
            console.log(`successfully written ${guest.id} to /tmp/guest.txt`)
        })
        .catch((err) => {
            if (err) {msg.channel.send(`I've run into an error!\nerror: \`${err}\``); return;}
        })

        guest.roles.add(guestRole)
        msg.channel.send(`** ${guest.user.username} **, remember that\n\`\`\`\n- you'll only have one message to send in the chat, which means your guest role will be taken away immediately after. So make sure there's no typos!\n\n- your message must be in the same format as any other big brain thoughts (you can also add a thing like \"<insert your name> DLC\" right after the bottom line if ya want)\n\`\`\``)
    }
}