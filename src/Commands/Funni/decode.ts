import { Command } from '../../Interfaces';

export const command: Command = {
	name: 'decode',
	public: true,
	description: "encode any sentence in base64!",
	aliases: ['de'],
	example: "s.decode aHR0cDovL2JpdC5seS8yek0ybzYxCg==",
	run: async (client, msg, args) => {
		if (args.length <= 0) { msg.channel.send("..."); return; }
		const MessageToDecode = args.toString().replace(/,/g, ' ')

		msg.reply(Buffer.from(MessageToDecode, 'base64').toString('utf-8'))
		.catch(err => console.error(err));
	}
}
