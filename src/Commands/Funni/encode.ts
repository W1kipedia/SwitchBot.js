import { Command } from '../../Interfaces';

export const command: Command = {
	name: 'encode',
	public: true,
	description: "encode sentences in base64!",
	aliases: ['en'],
	example: "s.encode amogus",
	run: async (client, msg, args) => {
		if (args.length <= 0) {msg.channel.send("..."); return;}
		const MessageToEncode = args.toString().replace(/,/g, ' ')

		msg.reply(Buffer.from(MessageToEncode, 'utf-8').toString('base64'))
		.catch(err => console.error(err));
	}
}
