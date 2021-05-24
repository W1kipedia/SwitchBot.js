import { Command } from '../../Interfaces';
import { createConnection } from 'mysql';

export const command: Command = {
    name: 'gambleflip',
    description: 'it\'s like coinflipping but gambling',
    aliases: [],
    run: async (client, msg, args) => {
        client.cooldowns.gambleflip.forEach((flipper) => {
            if (flipper === msg.author.id) {
                msg.channel.send("You've already gambleflipped today...")
                    .catch(err => console.error(err));
                return;
            }
        });
        if (args.length === 0) return;
        try{const amount = parseInt((args[0] as string))}
        catch (error) {
            msg.channel.send("You must provide an amount to gamble!")
                .catch((err) => console.error(err));
            return;
        }
        await client.OpenAccount(msg.author.id);
        const choices = [true, false];

        const conn = createConnection(client.config.dbEconomy);

        conn.connect((err) => {
            if (err) throw err;

            if (choices[Math.floor(Math.random() * choices.length)]) {
                const earnings = Math.floor(Math.random() * 100);

                msg.channel.send(`You made ${earnings} snips!`)
                    .then(() => {
                        const q = `UPDATE Economy SET wallet = ${earnings} WHERE client_id = '${msg.author.id}'`;
                        conn.query(q, (err) => {if (err) throw err});
                    })
                    .catch(err => console.error(err));
            } else {
                msg.channel.send("after begging for some money you weren't able to get any money 😔")
                    .catch((err) => console.error(err))
            }
        })
        client.cooldowns.gambleflip.push(msg.author.id);
        setTimeout(() => {
            const location = client.cooldowns.gambleflip.indexOf(msg.author.id);
            if (location > -1) {
                client.cooldowns.gambleflip.splice(location, 1);
            }
        }, 86400000)
    }
}