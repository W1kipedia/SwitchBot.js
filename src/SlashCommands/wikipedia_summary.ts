import { MessageEmbed, MessageEmbedThumbnail } from 'discord.js';
import wikipedia from 'wikipedia';
import { SlashCommand } from '../Interfaces';

export const slashCommand: SlashCommand = {
	run: async (interaction) => {
		wikipedia.page(interaction.options.array()[0].value.toString())
			.then(async (page) => {
				const summary = (await page.summary()).extract;
				const thumbnails = await page.images();

				if (summary.toLowerCase().endsWith('may refer to:')) {
					wikipedia.search(interaction.options.array()[0].value.toString())
						.then((srch) => {
							const results: string[] = []

							srch.results.forEach((result) => {
								results.push(result.title)
							});

							const e = new MessageEmbed({
								title: 'Wikipedia Search',
								color: 3066993,
								fields: [
									{ name: '**results**', value: results.toString().replace(/,/g, '\n'), inline: true },
								],
								footer: { text: `Command by ${interaction.user.username}`, iconURL: interaction.user.avatarURL()}
							});
							e.setThumbnail('https://media.discordapp.net/attachments/756027330656337951/844262888097185802/1200px-Wikipedia-logo-v2.png');
							interaction.reply({ content: 'I ran into a disambiguation!\n search one of these instead:', embeds: [e], ephemeral: true});
						})
						.catch((err) => {
							interaction.reply({content: "I see to have run into an error, displaying error!\n`" + err + "`", ephemeral: true});
						});
					return;
				}

				const em = new MessageEmbed({
					title: page.title,
					url: page.fullurl,
					color: 3066993,
					footer: { text: `Command by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() },
					fields: [
						{ name: 'Wikipedia Summary', value: summary, inline: true }
					]
				});
				const AvailableThumbnails: string[] = [];
				thumbnails.forEach((thumbnail) => {
					if (thumbnail.url.endsWith('.jpg') || thumbnail.url.endsWith('.png')) {
						AvailableThumbnails.push(thumbnail.url);
					}
				});
				em.setThumbnail(AvailableThumbnails.length === 0 ?'https://media.discordapp.net/attachments/756027330656337951/844262888097185802/1200px-Wikipedia-logo-v2.png': AvailableThumbnails[0]);
				interaction.reply({ embeds: [em], ephemeral: true});
			})
			.catch(async (err) => {
				interaction.reply({content: "Couldn't find the page `" + interaction.options.array()[0].value.toString() + "`, maybe try searching for it?", ephemeral: true});
			})
		.catch(err => console.error(err));
	}
}