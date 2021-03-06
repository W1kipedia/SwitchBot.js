import { MessageEmbed } from 'discord.js';
import { SlashCommand } from '../Interfaces';

export const slashCommand: SlashCommand = {
	run: async (client, interaction) => {
		if (!(interaction.options.getUser('user'))) {
			const em = new MessageEmbed({
				title: 'Avatar',
				color: 0
			});
			em.setImage(interaction.user.avatarURL({dynamic: true, format:'png', size: 256}))
			em.setAuthor(interaction.user.tag, interaction.user.avatarURL())
			interaction.reply({
				embeds: [em],
				ephemeral: true
			})
		} else {
			const em = new MessageEmbed({
				title: 'Avatar',
				color: 0
			});
			em.setImage(interaction.options.getUser('user').avatarURL({dynamic: true, format: 'png', size: 256}));
			em.setAuthor(interaction.options.getUser('user').tag, interaction.options.getUser('user').avatarURL())
			interaction.reply({
				embeds: [em],
				ephemeral: true
			})
		}
	}
}
