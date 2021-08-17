import { Buttons } from '../Interfaces';

export const Button: Buttons = {
	run: async (client, button) => {
		client.tempConfig.summaryPosition.forEach(async (result) => {
			if (result.id === button.user.id) {
				result.Position -= 1;
				result.embed.setThumbnail(result.ImageArray[result.Position])
				await button.deferUpdate();
				result.interaction.editReply({
					content: "Don't worry if you get a \"This interaction failed\" warning when using buttons, it's normal",
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
									disabled: result.Position === 0 ? true : false
								},
								{
									type: "BUTTON",
									style: "PRIMARY",
									label: 'Next Image',
									customId: 'wikipedia_imageNext',
									disabled: true
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
