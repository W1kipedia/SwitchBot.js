import { Command } from "../Interfaces";
import wikipedia from 'wikipedia';
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'wiki_page',
    description: 'Get the entire page content of an article (warning, this may not work all the time due to too many characters)',
    aliases: ['page'],
    run: async (client, msg, args) => {
        if (args.length === 0) return;

        if (msg.channel.id === '693942287910305842') {
            wikipedia.page(args.toString().replace(',', ' '))
                .then(async (page) => {
                    const em = new MessageEmbed({
                        title: page.title,
                        url: page.fullurl,
                        color: 3066993,
                        footer: { text: `Command by ${msg.author.username}`, iconURL: msg.author.avatarURL() },
                        fields: [
                            { name: 'summary', value: page.content(), inline: true }
                        ]
                    });
                    msg.channel.send(em);
                })
                .catch(async (err) => {
                    console.log(typeof err);
                    console.error(err);
                    msg.channel.send("Couldn't find the page `" + args.toString().replace(',', ' ') + "`, maybe try searching for it?");
                })

        } else {
            msg.channel.send("you can only use this command in <#693942287910305842>")
        }
    }
}