import { SlashCommand } from '../Interfaces';

export const slashCommand: SlashCommand = {
	run: async (client, interaction) => {
		if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.has('643128678804619316')) {
			const person_to_send_msg_to = interaction.guild.members.cache.get(interaction.options.getUser('member').id);

			person_to_send_msg_to.user.send({
				content: `A moderator from Switch n' Snap decided to anonymously dm you \`${interaction.options.getString('message').toString()}\``
			})
			.then(msg => {
				client.UpdateLog(`${interaction.user.tag} sent ${interaction.options.getUser('member').tag} "${interaction.options.getString('message').toString()}"`);
				interaction.reply({
					content: "✅Succesfully sent!",
					ephemeral: true
				});
			})
			.catch(err => {
				interaction.reply({
					content: "The person you're trying to dm has their dms closed :c",
					ephemeral: true
				})
			});
		} else {
			interaction.reply({
				content: 'You must be staff to use this command!',
				ephemeral: true
			})
		}
	}
}
