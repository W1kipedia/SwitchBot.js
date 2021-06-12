import { MessageEmbed } from 'discord.js';
import { SlashCommand } from '../Interfaces';

export const slashCommand: SlashCommand = {
	run: async (interaction) => {
		const em = new MessageEmbed({
			title: 'Help menu',
			color: 3447003,
			fields: [
				{
					name: '**Economy**',
					value: '`balance` `beg` `deposit` `give` `withdraw`'
				},
				{
					name: '**Funni**',
					value: '`coinflip`, `open_url`, `owo`'
				},
				{
					name: '**Gambling**',
					value: '`gambleflip` `rob`'
				},
				{
					name: '**Images**',
					value: '`alex` `bingus` `candice` `cole` `cryson` `derp` `joe` `joey`'
				},
				{
					name: '**Misc**',
					value: '`help` `ping`'
				},
				{
					name: '**Moderation**',
					value: '`ban` `delete` `dm` `kick` `mute` `unban` `unmute`'
				},
				{
					name: '**Tts**',
					value: '`join` `leave` `speak`'
				},
				{
					name: '**Wikipedia**',
					value: '`wikipedia_search` `wikipedia_summary`'
				}
			],
			footer: { text: 'https://github.com/W1kipedia/SwitchBot.js' }
		});
		interaction.reply({
			embeds: [em],
			ephemeral: true
		})
	}
}
