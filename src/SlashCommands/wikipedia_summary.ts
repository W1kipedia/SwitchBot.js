import { MessageEmbed } from 'discord.js';
import wikipedia from 'wikipedia';
import { SlashCommand } from '../Interfaces';

export const slashCommand: SlashCommand = {
	run: async (client, interaction) => {
		wikipedia.page(interaction.options.array()[0].value.toString())
			.then(async (page) => {
				const summary = (await page.summary()).extract;
				const thumbnails = (await page.images())
				.map(image => image.url)
				.filter(url => url.endsWith('.jpg') || url.endsWith('.png'));

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

				var HasWikipeidaLogo = false;
				if (thumbnails.length === 0) {
					em.setThumbnail('https://media.discordapp.net/attachments/756027330656337951/844262888097185802/1200px-Wikipedia-logo-v2.png')
					HasWikipeidaLogo = true;
				} else {
					em.setThumbnail(thumbnails[0]);
				}

				HasWikipeidaLogo ? interaction.reply({
				// checks if the default wikipedia logo is on the embed
					embeds: [em],
					ephemeral: true,
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: 'View Full Page',
									style: 5,
									url: page.fullurl
								}
							]
						}
					]
				})
				: 
				//if not then it'll add buttons to the interaction
				interaction.reply({
					embeds: [em],
					ephemeral: true,
					components: [
						{
							type: 1,
							components: [
							{
								type: 2,
								label: 'View Full Page',
								style: 5,
								url: page.fullurl
							},
							{
								type: 2,
								style: 1,
								label: 'Back',
								customID: 'wikipedia_imageBack',
								disabled: true
							},
							{
								type: 2,
								style: 1,
								label: 'Next',
								customID: 'wikipedia_imageNext',
								disabled: false
							}
							]
						}
					]
				})
					// then we'll set the tempconfig
					.then(() => {
						interaction.fetchReply()
						.then((msg) => {
							client.tempConfig.summaryPosition.push({
								Position: 0,
								id: parseInt(msg.id),
								ImageArray: thumbnails
							})
						})
					})
			})
			.catch(async (err) => {
				interaction.reply({content: "Couldn't find the page `" + interaction.options.array()[0].value.toString() + "`, maybe try searching for it?", ephemeral: true});
			})
		.catch(err => console.error(err));
	}
}
