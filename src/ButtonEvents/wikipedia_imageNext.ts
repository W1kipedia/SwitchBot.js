import { Buttons } from '../Interfaces';

export const Button: Buttons = {
	run: async (client, button) => {
		client.tempConfig.summaryPosition.forEach(async (result) => {
			if (result.id === button.user.id) {
				result.Position += 1;
				result.embed.setThumbnail(result.ImageArray[result.Position])
				await button.deferUpdate();
				result.interaction.editReply({
					embeds: [result.embed],
					components: [
						{
							type: "ACTION_ROW",
							components: [
								{
									type: "BUTTON",
									style: "PRIMARY",
									label: 'Previous Image',
									customId: 'wikipedia_imageBack',
									disabled: false
								},
								{
									type: "BUTTON",
									style: "PRIMARY",
									label: 'Next Image',
									customId: 'wikipedia_imageNext',
									disabled: result.Position === result.ImageArray.length ? true : false
								},
								{
									type: "BUTTON",
									label: 'View Full Page',
									style: "LINK",
									url: result.url
								}
							]
						}
					]
				})
			}
		})
	}
}
