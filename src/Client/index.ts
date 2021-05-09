import { Client, Collection } from 'discord.js';
import path from 'path';
import * as MySQL from 'mysql';
import { readdirSync } from 'fs';
import { Command, Events, Config } from '../Interfaces';
import { createConnection } from "mysql";
import ConfigJson from '../../data/config.json';

class ExtendedClient extends Client{
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Events> = new Collection();
    public config: Config = ConfigJson;
    public aliases: Collection<string, Command> = new Collection();

    public async init(): Promise<void>{
        this.login(this.config.token);
        /*MySQL.createConnection({
            "host": this.config.db.host,
            "password": this.config.db.password,
            "database": this.config.db.database
        })*/

        const CommandPath = path.join(__dirname, "..", "Commands");
        readdirSync(CommandPath).forEach((dir) => {
            const commands = readdirSync(`${CommandPath}/${dir}`)
            .filter((file) => file.endsWith('.ts'))
            
            for (const file of commands) {
                const { command } = require(`${CommandPath}/${dir}/${file}`);
                console.log(command);
                this.commands.set(command.name, command);

                if (command.aliases.length !== 0) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });

        const eventPath = path.join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            console.log(event);
            this.on(event.name, event.run.bind(null, this))
        });

    }
    public async OpenAccount(user_id:string|number):Promise<void> {
        const amogus = createConnection(this.config.dbEconomy);

        amogus.connect((err) => {
            if (err) throw err;
            const sql = `SELECT client_id FROM Economy WHERE client_id = '${user_id}'`;
            amogus.query(sql, (err, result: any[]) => {
                if (err) throw err;
                if (result.length === 0) {
                    const queue = `INSERT INTO Economy VALUES ('${user_id}', 69, 420)`;
                    amogus.query(queue, (problem, yeet) => {if (problem) throw problem;console.log(yeet)});
                    amogus.destroy();
                }
            });
        });
    }
    public async update_bank(user_id:string|number, change:number, mode:string) {
        const con = createConnection(this.config.dbEconomy);

        con.connect((f) => {
            if (f) throw f;
            const sql = `UPDATE Economy SET ${mode} = ${mode} + ${change} WHERE client_id = '${user_id}'`;
            con.query(sql, (err, result) => {
                if (err) throw err;
                con.destroy();
            });
        });
    }
}

export default ExtendedClient;


