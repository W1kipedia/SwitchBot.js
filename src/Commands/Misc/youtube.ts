import { Command } from '../../Interfaces';

export const command: Command = {
	name: 'youtube',
	public: true,
	aliases: [],
	example: 's.youtube',
	description: 'A link to the Switch n Snap youtube channel!',
	run: async (client, msg, args) => {
		msg.delete()
		.then(() => {
			msg.channel.send({
				content: 'https://youtube.com/channel/UCsm0frad-zaZiSeGuuHgepQ'
			})
			.then(m => {
				setTimeout(() => m.delete(), 60000)
			})
		})
		.catch(err => console.error(err));
	}
}
