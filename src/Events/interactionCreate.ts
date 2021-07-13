import { Interaction } from 'discord.js';
import { join } from 'path';
import { Events } from '../Interfaces';

export const event: Events = {
	name: 'interactionCreate',
	run: async (client, interaction:Interaction) => {
		if (interaction.isCommand()) {
			const path = join(__dirname, '..', 'SlashCommands');
			const { slashCommand } = require(`${path}/${interaction.commandName.toLowerCase()}.ts`);
			await slashCommand.run(client, interaction);
		}
		if (interaction.isButton()) {
			const path = join(__dirname, '..', 'ButtonEvents');
			const { Button } = require(`${path}/${interaction.customId}.ts`);
			await Button.run(client, interaction);
		}
	}
}
